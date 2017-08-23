var _ = require('underscore');
var db = require('../../db');

var deleteTeam = function(req, res) {
    var team_id = req.params.team_id;
    db.playerTeams.findOne({
            where:  {team_id : team_id} 
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
    var user_id = req.params.user_id;

    db.playerTeams.findAll({
        where : {
            user_id: user_id
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
    db.sequelize.query("SELECT PT.team_id, PT.team_name, PT.is_active, PT.has_paid, U.full_name, U.email FROM playerteams PT JOIN users U ON U.user_id = PT.user_id")
        .then(function(playerTeams){
            res.json(playerTeams);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};

var updateTeamActive = function(req, res) {
    var body = _.pick(req.body, 'team_id', 'active');
    var attributes = {is_active: body.active};

    if(!body.hasOwnProperty('team_id')) {
        res.status(401).send();
        return;
    }

    db.playerTeams.findOne({
        where: {
            team_id: body.team_id
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
    var body = _.pick(req.body, 'team_id', 'paid');
    var attributes = {has_paid: body.paid};

    if(!body.hasOwnProperty('team_id')) {
        res.status(401).send();
        return;
    }

    db.playerTeams.findOne({
        where: {
            team_id: body.team_id
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
    var body = _.pick(req.body, 'team_name', 'user_id');
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
    var team_id = req.params.team_id;
    var body = _.pick(req.body, 'team_name');

    if (!body.hasOwnProperty('team_name')){
        res.status(401).send();
        return;
    }

    var attributes = { team_name : body.team_name};

    db.playerTeams.findOne({
        where: {
            team_id: team_id
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