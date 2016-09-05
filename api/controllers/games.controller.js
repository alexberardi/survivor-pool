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
                gameID: sanitizeGame.gsis,
                homeTeamName: sanitizeGame.hnn,
                homeTeamCityAbbr: sanitizeGame.h,
                homeScore: sanitizeGame.hs,
                awayTeamName: sanitizeGame.vnn,
                awayTeamCityAbbr: sanitizeGame.v,
                awayScore: sanitizeGame.vs,
                dayOfWeek: sanitizeGame.d,
                time: sanitizeGame.t,
                gameDate: sanitizeGame.eid,
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
    var gameID = parseInt(req.params.gameID, 10);
    var body = _.pick(req.body, 'homeScore', 'awayScore', 'quarter');
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


module.exports = {
    populateGames: populateGames,
    getWeeklyGames: getWeeklyGames,
    updateGames: updateGames
}