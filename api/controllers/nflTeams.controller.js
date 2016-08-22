var request = require('request');
var _ = require('underscore');
var db = require('../../db');

module.exports = function(req, res){
    request.get('http://www.nfl.com/liveupdate/scorestrip/ss.json', function(err, innerRes, body){
        body = JSON.parse(body)

        games = body.gms;
        var error;

        games.forEach(function(game){
            var sanitizeTeam = _.pick(game, 'h', 'v', 'vnn', 'hnn');

            var homeTeamInfo = {
                teamName: sanitizeTeam.hnn,
                teamCity: sanitizeTeam.h,
                logoFileName: sanitizeTeam.hnn + '.gif'
            }
            var awayTeamInfo ={
                teamName: sanitizeTeam.vnn,
                teamCity: sanitizeTeam.v,
                logoFileName: sanitizeTeam.vnn + '.gif',
            }

            db.teams.create(homeTeamInfo)
                .catch(function(e){
                    error = e;
                });

            db.teams.create(awayTeamInfo)
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
}