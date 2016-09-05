var request = require('request');
var _ = require('underscore');
var db = require('../../db');

var populateGames = function(req, res){
    request.get('http://www.nfl.com/liveupdate/scorestrip/ss.json', function(err, innerRes, body){
        body = JSON.parse(body)
        week = body.w;

        games = body.gms;
        var error;

        games.forEach(function(game){
            var sanitizeGame = _.pick(game, 'hs', 'd', 'gsis', 'vs', 'eid', 'h', 'v', 'vnn', 't', 'q', 'hnn');

            var gameInfo = {
                gameid: sanitizeGame.gsis,
                hometeamname: sanitizeGame.hnn,
                hometeamcityabbr: sanitizeGame.h,
                homescore: sanitizeGame.hs,
                awayteamname: sanitizeGame.vnn,
                awayteamcityabbr: sanitizeGame.v,
                awayscore: sanitizeGame.vs,
                dayofweek: sanitizeGame.d,
                time: sanitizeGame.t,
                gamedate: sanitizeGame.eid,
                quarter: sanitizeGame.q,
                week: week,
            }
            db.games.create(gameInfo)
                .catch(function(e){
                    error = e;
                });
        })
        if (!error) {
            res.status(200).send();
        } else {
            res.status(400).json(e);
        }

    });
};

var getWeeklyGames = function(req, res){
    db.games.max('week')
        .then(function(max){
            db.games.findAll({
                where: {week : max}
            })
                .then(function(weeks){
                    res.json(weeks);
                })
                .catch(function(e){
                    return res.status(500).json(e);
                });
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};

var updateGames = function(req, res) {
    var gameID = parseInt(req.params.gameid, 10);
    var body = _.pick(req.body, 'homescore', 'awayscore', 'quarter');

    body.homescore = parseInt(body.homescore);
    body.awayscore = parseInt(body.awayscore)

    db.games.findOne({
        where: {
            gameID: gameID
        }
    })
        .then(function(game) {
            game.update(body)
                .then(function(game){
                    res.json(game.toJSON());
                })

        })
        .catch(function(e){
            res.status(400).send();
        })
}

var getStartedGames = function(req, res) {
    db.games.findAll({
        where: {
            quarter: {$ne : 'P'}
        }
    })
        .then(function(game){
            res.json(game);
        })
        .catch(function(e){
            res.status(500).send();
        });
}

module.exports = {
    populateGames: populateGames,
    getWeeklyGames: getWeeklyGames,
    updateGames: updateGames,
    getStartedGames: getStartedGames
}