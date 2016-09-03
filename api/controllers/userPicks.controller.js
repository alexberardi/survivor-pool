var _ = require('underscore');
var db = require('../../db');


var makePick = function(req, res) {
    var body = _.pick(req.body, 'week', 'userId', 'teamName', 'gameId');

    body.userId = parseInt(body.userId);
    body.gameId = parseInt(body.gameId);


    db.userPicks.findOne(
        {
            where: {
                week: {$ne : parseInt(body.week)},
                userId: body.userId,
                teamName: body.teamName
            }
        })
        .then(function(game){
            if (!game) {
                db.userPicks.findOne({where: {userId: body.userId, week: body.week}})
                    .then(function(pick){
                        if(pick) {
                            return pick.update(body)
                                .then(function(pick){
                                    res.json(pick.toJSON());
                                }, function(e){
                                    res.status(400).json(e);
                                });
                        } else {
                            db.userPicks.create(body)
                                .then(function(pick){
                                    res.json(pick);
                                })
                                .catch(function(e){
                                    console.log(e);
                                    res.status(400).json(e);
                                });
                        }
                    }, function(e) {
                        db.userPicks.create(body)
                            .then(function(pick){
                                res.json(pick);
                            })
                            .catch(function(e){
                                console.log(e);
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
    var userID = parseInt(req.params.userId, 10);
    db.userPicks.findAll({
        order: [
            ['week', 'DESC']
        ],
        where : {
            userId: userID
        }
    })
        .then(function(picks){
            res.json(picks);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};

var getCurrentPicks = function(req, res) {
    var userID = parseInt(req.params.userId, 10);
    db.games.max('week')
        .then(function(max){
            db.userPicks.findAll({
                where: {
                    week: max,
                    userId: userID
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
    getCurrentPicks: getCurrentPicks
};