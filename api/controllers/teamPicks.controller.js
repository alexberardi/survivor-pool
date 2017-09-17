var _ = require('underscore');
var db = require('../../db');
var ctrlGames = require('../../api/controllers/games.controller');

var makePick = function(req, res) {
    ctrlGames.updateGamesAsync().then(function(){

        var body = _.pick(req.body, 'week', 'user_id','team_id', 'game_id', 'team_name');
        body.game_id = parseInt(body.game_id, 10);
        db.teamPicks.findOne(
            {
                where: {
                    week: {$ne : parseInt(body.week)},
                    user_id: body.user_id,
                    team_id: body.team_id,
                    team_name: body.team_name
                }
            })
            .then(function(game){
                if (!game) {
                    db.teamPicks.findOne({where: {user_id: body.user_id, team_id: body.team_id, week: body.week}})
                        .then(function(pick){
                            if(pick) {
                                db.games.findOne({
                                    where: {
                                        game_id: pick.game_id
                                    }
                                })
                                    .then( function(currentgame){
                                        if (currentgame.quarter === 'P') {
                                            return pick.update(body)
                                                .then(function(pick){
                                                    res.json(pick.toJSON());
                                                }, function(e){
                                                    res.status(400).json(e);
                                                });
                                        } else {
                                            res.status(402).send();
                                        }
                                    }, function(e) {
                                      res.status(500).send();
                                    })

                            } else {
                                db.teamPicks.create(body)
                                    .then(function(pick){
                                        res.json(pick);
                                    })
                                    .catch(function(e){
                                        res.status(400).json(e);
                                    });
                            }
                        }, function(e) {
                            db.teamPicks.create(body)
                                .then(function(pick){
                                    res.json(pick);
                                })
                                .catch(function(e){
                                    res.status(500).json(e);
                                });
                        });
                }
                else {
                    res.status(401).send();
                }
            });
    });

};

var getPicks = function(req, res) {
    db.teamPicks.findAll({
        order: [
            ['week', 'DESC']
        ],
        where : {
            user_id: req.params.user_id,
            team_id: req.params.team_id
        }
    })
        .then(function(picks){
            res.json(picks);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};

var getAdminPicks = function(req, res) {
    var week = parseInt(req.query.week);

    db.sequelize.query("SELECT U.Id, U.email, TP.team_name, TP.Week FROM users U JOIN teampicks TP ON TP.user_id = U.ID WHERE U.ID IN (1,5) AND Week = " + week)
        .then(function(picks){
            res.json(picks);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};


var getPopularPicks = function(req, res) {
    var week = parseInt(req.params.week);

    db.sequelize.query("SELECT team_name, count(team_name) as count FROM teampicks WHERE week='" + week + "' GROUP BY team_name")
        .then(function(picks){
            res.json(picks);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};

var getAllPopularPicks = function(req, res) {
    db.sequelize.query("SELECT team_name, COUNT(*) AS count FROM teampicks GROUP BY team_name ORDER BY 2 DESC LIMIT 5")
        .then(function(picks) {
            res.json(picks);
        })
        .catch(function(e){
            return res.status(500).json(e);
        })
};

var getCurrentPicks = function(req, res) {
    db.games.max('week')
        .then(function(max){
            db.teamPicks.findAll({
                where: {
                    week: max,
                    user_id: req.params.user_id,
                    team_id: req.params.team_id
                }
            })
                .then(function(userPick){
                    res.json(userPick);
                })
                .catch(function(e){
                    return res.status(500).json(e);
                });
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
}

var getLastWeekPick = function(req, res) {
    db.games.max('week')
        .then(function(max) {
            let lastWeek = max - 1;
            db.teamPicks.findAll({
                where: {
                    week: lastWeek,
                    user_id: req.params.user_id,
                    team_id: req.params.team_id
                }
            })
            .then(function(userPick) {
                res.json(userPick);
            })
            .catch(function(e) {
                return res.status(500).json(e);
            });
        })
        .catch(function(e) {
            return res.status(500).json(e);
        });
}


var getSchedule = function (req, res) {
    ctrlGames.updateGamesAsync().then(function(resolution, requesting) {
        var week = parseInt(req.params.week, 10);

        if (!week) {
            db.games.max('week')
                .then(function(max){
                    week = max;
                });
        }
        var updatedGames = [], currentSelection, previousSelections = [];

        db.games.findAll({
            where: {
                week: week
            },
                order: ['game_date', 'time', 'game_id']
        }).then(function(games) {
            games.forEach(function(game){
                game = Object.assign(game.dataValues, {has_started: (game.quarter !== 'P')});
                updatedGames.push(game);
            });
        });

        db.teamPicks.findAll({
            where: {
                team_id: req.params.team_id,
                user_id: req.params.user_id
            }
        })
        .then(function(picks){
            if(picks) {
                picks.forEach(function(pick){
                    if (pick.week === week){
                        currentSelection = pick;
                    } else {
                        previousSelections.push(pick);
                    }

                });
            }

            res.json({ games: updatedGames, currentSelection: currentSelection, previousSelections: previousSelections });          
        });
    });      
}

module.exports = {
    makePick: makePick,
    getPicks: getPicks,
    getCurrentPicks: getCurrentPicks,
    getPopularPicks: getPopularPicks,
    getAllPopularPicks: getAllPopularPicks,
    getAdminPicks: getAdminPicks,
    getLastWeekPick: getLastWeekPick,
    getSchedule: getSchedule
};