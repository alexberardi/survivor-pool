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
                team_name: sanitizeTeam.hnn,
                team_city: sanitizeTeam.h
            }

            var awayTeamInfo ={
                team_name: sanitizeTeam.vnn,
                team_city: sanitizeTeam.v
            }
            console.log(homeTeamInfo);
            db.nflTeams.create(homeTeamInfo)
                .catch(function(e){
                    error = e;
                });

            db.nflTeams.create(awayTeamInfo)
                .catch(function(e){
                    error = e;
                });
        })
    });
}