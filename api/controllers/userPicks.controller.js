var _ = require('underscore');
var db = require('../../db');


var makePick = function(req, res) {
    var body = _.pick(req.body, 'week', 'userId', 'teamId', 'gameId');

    body.userId = parseInt(body.userId);
    body.teamId = parseInt(body.teamId);
    body.gameId = parseInt(body.gameId);

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
            res.status(500).send();
        })

}

module.exports = {
    makePick: makePick
};