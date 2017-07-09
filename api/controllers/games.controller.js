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
            console.log("here");
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
}

var updateGames = function(req, res) {
    var gameID = parseInt(req.params.gameID, 10);
    var body = _.pick(req.body, 'homeScore', 'awayScore', 'quarter');

    body.homeScore = parseInt(body.homeScore, 10);
    body.awayScore = parseInt(body.awayScore, 10)

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
    db.games.max('week')
        .then(function(max) {
            db.games.findAll({
                where: {
                    quarter: {$ne : 'P'},
                    week: max
                }
            })
                .then(function(game){
                    res.json(game);
                })
                .catch(function(e){
                    res.status(500).send();
                });
        })
        .catch(function(e) {
           res.status(400).send();
        });

}

var getCurrentWeek = function(req, res) {
    db.games.max('week')
        .then(function(max){
            res.json(max);
        })
        .catch(function(e){
            res.status(500).json(e);
        })   
}

module.exports = {
    populateGames: populateGames,
    getWeeklyGames: getWeeklyGames,
    updateGames: updateGames,
    getStartedGames: getStartedGames,
    getCurrentWeek: getCurrentWeek
}