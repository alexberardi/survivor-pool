var request = require('request');
var _ = require('underscore');
var db = require('../../db');

var createGamesArray = function(games) {
    var newGamesArray = [];
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
            newGamesArray.push(gameInfo);
        });
    return newGamesArray;
};

var populateGames = function(req, res){
    request.get('http://www.nfl.com/liveupdate/scorestrip/ss.json', function(err, innerRes, body){
        body = JSON.parse(body);
        week = body.w;

        games = body.gms;
        
        db.games.bulkCreate(createGamesArray(games))
            .then(function(results){
                res.status(200).send();
            })
            .catch(function(e) {
                console.log(e);
                res.status(400).send();
            });
    });
};

var updateGames = function(req, res) {
    request.get('http://www.nfl.com/liveupdate/scorestrip/ss.json', function(err, innerRes, body) {
        body = JSON.parse(body);
        week = body.w;

        games = body.gms;

        games.forEach(function(game) {
            db.games.update(
            {
                homeScore: parseInt(game.hs, 10),
                awayScore: parseInt(game.vs, 10),
                quarter: game.q
            },{
                where: {
                    gameID: parseInt(game.gsis, 10)
                }
            }
            )
            .catch(function(error) {
                res.status(400).send();
            })
        });
        res.status(200).send();
    });
}

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