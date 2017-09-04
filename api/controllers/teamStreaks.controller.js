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

var getStandings = function(req, res) {
    getMaxWeek().then(function(week){
        var arr = [];
        var promises = [];
        db.user.findAll({})
        .then(function(users){   
            users.forEach(function(user){  
                var query;
                query = 'SELECT pt.team_name as player_team_name, pt.is_active as is_active, ts.total as streak_total, CASE WHEN g.quarter = \'P\' THEN NULL ELSE tp.team_name END as currentpick FROM playerteams pt LEFT JOIN teamstreaks ts on ts.team_id = pt.team_id LEFT JOIN teamPicks tp on tp.team_id = pt.team_id LEFT JOIN games g on g.game_id = tp.game_id where pt.user_id = :user_id AND (tp.week = :week OR tp.week is null)' ;
                promises.push(                
                    db.sequelize.query(query, {replacements: {user_id: user.user_id, week: week}, type: db.sequelize.QueryTypes.SELECT})
                        .then(function(teams){
                                arr.push({
                                    user_id: user.user_id,
                                    full_name: user.full_name,
                                    picture_url: user.picture_url,
                                    teams: teams,
                                    game_id: user.game_id
                                })
                        })
                    );                    
            });
            Promise.all(promises).then(function(stuff){
                res.json(arr);
            });                   
        });
    });
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

