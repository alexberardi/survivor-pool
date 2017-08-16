var _ = require('underscore');
var db = require('../../db');


var makePick = function(req, res) {
    var body = _.pick(req.body, 'week', 'userID','teamID', 'gameID', 'teamName');
    body.gameID = parseInt(body.gameID, 10);
    db.teamPicks.findOne(
        {
            where: {
                week: {$ne : parseInt(body.week)},
                userID: body.userID,
                teamID: body.teamID,
                teamName: body.teamName
            }
        })
        .then(function(game){
            if (!game) {
                db.teamPicks.findOne({where: {userID: body.userID, teamID: body.teamID, week: body.week}})
                    .then(function(pick){
                        if(pick) {
                            db.games.findOne({
                                where: {
                                    gameID: pick.gameID
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


}

var getPicks = function(req, res) {
    var userID = parseInt(req.params.userID, 10);
    db.teamPicks.findAll({
        order: [
            ['week', 'DESC']
        ],
        where : {
            userID: userID
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

    db.sequelize.query("SELECT U.Id, U.email, TP.TeamName, TP.Week FROM users U JOIN TeamPicks TP ON TP.userID = U.ID WHERE U.ID IN (1,5) AND Week = " + week)
        .then(function(picks){
            res.json(picks);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};


var getPopularPicks = function(req, res) {
    var week = parseInt(req.query.week);

    db.sequelize.query("SELECT teamname, count(teamname) as count FROM TeamPicks WHERE week='" + week + "' GROUP BY teamname")
        .then(function(picks){
            res.json(picks);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};

var getCurrentPicks = function(req, res) {
    var userID = parseInt(req.params.userID, 10);
    db.games.max('week')
        .then(function(max){
            db.teamPicks.findAll({
                where: {
                    week: max,
                    userID: userID
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

module.exports = {
    makePick: makePick,
    getPicks: getPicks,
    getCurrentPicks: getCurrentPicks,
    getPopularPicks: getPopularPicks,
    getAdminPicks: getAdminPicks
};