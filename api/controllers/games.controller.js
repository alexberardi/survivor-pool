var request = require('request');
var _ = require('underscore');
var db = require('../../db');

var createGamesArray = function(games) {
    var newGamesArray = [];
    games.forEach(function(game){
            var sanitizeGame = _.pick(game, 'hs', 'd', 'gsis', 'vs', 'eid', 'h', 'v', 'vnn', 't', 'q', 'hnn');

            var gameInfo = {
                game_id: sanitizeGame.gsis,
                home_team_name: sanitizeGame.hnn,
                home_team_city_abbr: sanitizeGame.h,
                home_score: sanitizeGame.hs,
                away_team_name: sanitizeGame.vnn,
                away_team_city_abbr: sanitizeGame.v,
                away_score: sanitizeGame.vs,
                day_of_week: sanitizeGame.d,
                time: sanitizeGame.t,
                game_date: sanitizeGame.eid,
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
                home_score: parseInt(game.hs, 10),
                away_score: parseInt(game.vs, 10),
                quarter: game.q
            },{
                where: {
                    game_id: parseInt(game.gsis, 10)
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

var updateGamesAsync = function(req, res) {
    return new Promise(function(resolve, reject) {
        request.get('http://www.nfl.com/liveupdate/scorestrip/ss.json', function(err, innerRes, body) {
            body = JSON.parse(body);
            week = body.w;

            games = body.gms;

            games.forEach(function(game) {
                db.games.update(
                {
                    home_score: parseInt(game.hs, 10),
                    away_score: parseInt(game.vs, 10),
                    quarter: game.q
                },{
                    where: {
                        game_id: parseInt(game.gsis, 10)
                    }
                }
                )
                .catch(function(error) {
                    console.log(error);
                    reject("Error occurred");
                })
            });
            resolve("All games updated");
        });
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
    getStartedGames: getStartedGames,
    getCurrentWeek: getCurrentWeek,
    updateGames: updateGames,
    updateGamesAsync: updateGamesAsync
}