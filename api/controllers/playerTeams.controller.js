var _ = require('underscore');
var db = require('../../db');

var teamsGetAll = function(req, res) {
    var userID = req.params.userID;

    db.playerTeams.findAll({
        where : {
            userid: userID
        }
    })
    .then(function(teams) {
        res.json(teams);
    })
    .catch(function(e) {
        res.json(e);
    });
}

var teamCreate = function(req,res){
    var body = _.pick(req.body, 'teamName', 'userID');
    db.playerTeams.create(body)
        .then(function(team) {
            res.json(team);
        })
        .catch(function(e) {
            console.log(e);
            res.status(400).json(e);
        });
};

var updateTeamName = function(req, res) {
    var teamID = req.params.teamID;
    var body = _.pick(req.body, 'teamName');

    if (!body.hasOwnProperty('teamName')){
        res.status(401).send();
        return;
    }

    var attributes = { teamName : body.teamName};

    db.playerTeams.findOne({
        where: {
            teamID: teamID
        }
    })
    .then(function(team) {
        if (team) {
            return team.update(attributes)
                .then(function(team){
                    res.json(team.toJSON());
                }, function(e){
                    res.status(400).json(e);
                });
        } else {
            res.status(404).send();
        }
    }, function(){
        res.status(500).send();
    });
};

module.exports = {
    teamsGetAll: teamsGetAll,
    teamCreate: teamCreate,
    updateTeamName: updateTeamName
}