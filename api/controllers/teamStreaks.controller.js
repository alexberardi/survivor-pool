var _ = require('underscore');
var db = require('../../db');

var updateStreak = function(req, res) {
       var body = _.pick(req.body, 'user_id', 'current');

        db.teamStreaks.findOne({where: {user_id: body.user_id, current: true}})
            .then(function(streak){
                if (Boolean(body.current) === true) {
                    body.total = streak.total + 1;
                } else {
                    body.total = streak.total;
                }
                return streak.update(body)
                    .then(function(streak){
                       res.json(streak.toJSON());
                    },
                    function(e){
                        res.status(404).json(e);
                    });
            }, function(e){
               res.status(404).send();
            })
            .catch(function(e){
                res.status(500).send();
            });
};


function getMaxWeek(){
    return new Promise(function(resolve, reject){
        db.games.max('week')
            .then(function(week){
                resolve(week);
            });
    });
}

function checkCurrentUserGames(user_id) {
    return new Promise(function(resolve, reject){
        getMaxWeek()
            .then(function(week){
                var tempObj = {
                    showCurrentPick: true,
                    week: week
                };
                var query = 'SELECT *, g.quarter as current_quarter FROM teampicks tp JOIN games g on tp.game_id = g.game_id where user_id = :user_id AND g.week = :week';
                db.sequelize.query(query, {replacements: {user_id: user_id, week: week}, type: db.sequelize.QueryTypes.SELECT})
                    .then(function(picksAndGames){
                        if(picksAndGames.length === 0){
                            picksAndGames.forEach(function(pickedGame){
                                if(pickedGame.current_quarter === 'P') {
                                    tempObj.showCurrentPick = false;
                                }
                            });
                        } else {
                            tempObj.showCurrentPick = false;                            
                        }
                        resolve(tempObj);
                    })
                    .catch(function(noGamesPicked){
                        tempObj.showCurrentPick = false;
                        resolve(tempObj);
                    })
            });            
    });        
}

var getStandings = function(req, res) {
    //var query = 'SELECT * FROM users u JOIN playerteams pt on pt.user_id = u.user_id LEFT JOIN teampicks tp  on tp.team_id = pt.team_id JOIN teamstreaks ts on ts.team_id = pt.team_id';
    checkCurrentUserGames(req.body.user_id)
        .then(function(showCurrentPicks){
            var arr = [];
            var promises = [];
            db.user.findAll({})
            .then(function(users){   
                console.log(showCurrentPicks);   
                console.log("i am here right now.");
                users.forEach(function(user){  

                    var query;
                    if(showCurrentPicks.showCurrentPick){
                        query = 'SELECT pt.team_name as player_team_name, pt.is_active as is_active, ts.total as streak_total, tp.team_name as currentpick FROM playerteams pt LEFT JOIN teamstreaks ts on ts.team_id = pt.team_id LEFT JOIN teamPicks tp on tp.team_id = pt.team_id  where pt.user_id = :user_id AND (tp.week = :week OR tp.week is null)' ;

                        promises.push(                
                            db.sequelize.query(query, {replacements: {user_id: user.user_id, week: showCurrentPicks.week}, type: db.sequelize.QueryTypes.SELECT})
                                .then(function(teams){
                                        arr.push({
                                            user_id: user.user_id,
                                            full_name: user.full_name,
                                            picture_url: user.picture_url,
                                            teams: teams
                                        })
                                })
                            );
                    } else {
                        query = 'SELECT pt.team_name as player_team_name, pt.is_active as is_active, ts.total as streak_total FROM playerteams pt LEFT JOIN teamstreaks ts on ts.team_id = pt.team_id where pt.user_id = :user_id'
                        promises.push(                
                            db.sequelize.query(query, {replacements: {user_id: user.user_id}, type: db.sequelize.QueryTypes.SELECT})
                                .then(function(teams){
                                        arr.push({
                                            user_id: user.user_id,
                                            full_name: user.full_name,
                                            picture_url: user.picture_url,
                                            teams: teams
                                        });
                                })
                            );
                    }                    
                });
                Promise.all(promises).then(function(stuff){
                    res.json(arr);
                })
                   
            })
        })    
        

};

var getCountActive = function(req, res) {
    db.teamStreaks.count({where: {current: true}})
        .then(function(streaks){
            res.json(streaks);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};


module.exports = {
    updateStreak: updateStreak,
    getStandings: getStandings,
    getCountActive: getCountActive
};

