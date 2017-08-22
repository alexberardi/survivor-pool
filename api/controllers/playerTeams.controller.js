var _ = require('underscore');
var db = require('../../db');

var deleteTeam = function(req, res) {
    var teamID = req.params.teamID;
    db.playerTeams.findOne({
            where:  {teamID : teamID} 
        })
    .then(function(team){
        team.destroy();
        res.status(200).send();
    })
    .catch(function(error) {
        console.log(error);
        res.status(500).send();
    });
};

var teamsGetAll = function(req, res) {
    var userID = req.params.userID;

    db.playerTeams.findAll({
        where : {
            userID: userID
        }
    })
    .then(function(teams) {
        res.json(teams);
    })
    .catch(function(e) {
        res.json(e);
    });
};

var teamsGetAllAdmin = function(req, res) {
    db.sequelize.query("SELECT PT.teamID, PT.teamName, PT.isActive, PT.hasPaid, U.fullName, U.email FROM `playerTeams` PT JOIN users U ON U.userID = PT.userID")
        .then(function(playerTeams){
            res.json(playerTeams);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};

var updateTeamActive = function(req, res) {
    var body = _.pick(req.body, 'teamID', 'active');
    var attributes = {isActive: body.active};

    if(!body.hasOwnProperty('teamID')) {
        res.status(401).send();
        return;
    }

    db.playerTeams.findOne({
        where: {
            teamID: body.teamID
        }
    })
    .then(function(team) {
        if(team) {
            return team.update(attributes)
                .then(function(team) {
                    res.json(team.toJSON());
                }, function(e) {
                    res.status(400).json(e);
                });
        } else {
            res.status(404).send();
        }
    }, function() {
        res.status(500).send();
    });
};

var updateTeamPaid = function(req, res) {
    var body = _.pick(req.body, 'teamID', 'paid');
    var attributes = {hasPaid: body.paid};

    if(!body.hasOwnProperty('teamID')) {
        res.status(401).send();
        return;
    }

    db.playerTeams.findOne({
        where: {
            teamID: body.teamID
        }
    })
    .then(function(team) {
        if(team) {
            return team.update(attributes)
                .then(function(team) {
                    res.json(team.toJSON());
                }, function(e) {
                    res.status(400).json(e);
                });
        } else {
            res.status(404).send();
        }
    }, function() {
        res.status(500).send();
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
    deleteTeam: deleteTeam,
    teamsGetAll: teamsGetAll,
    teamsGetAllAdmin: teamsGetAllAdmin,
    teamCreate: teamCreate,
    updateTeamName: updateTeamName,
    updateTeamActive: updateTeamActive,
    updateTeamPaid: updateTeamPaid
}