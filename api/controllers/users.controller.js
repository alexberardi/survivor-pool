var db = require('../../db');
var _ = require('underscore');

var userGet = function(req, res) {
    var user_id = req.params.user_id;

    db.user.findOne({
        where: {
            user_id: user_id
        }
    })
    .then(function(user) {
        res.json(user);
    })
    .catch(function(e) {
        res.json(e);
    });
    
}

var userCheck = function(req, res) {
    var user_id = req.params.user_id;

    db.user.findOne({
        attributes: ['user_id'],
        where: {
            user_id: user_id
        }
    })
    .then(function(user) {
        res.json(user);
    })
    .catch(function(e) {
        res.json(e);
    });
}


var usersGetAll = function(req, res) {
    db.user.findAll()
        .then(function(users){
            res.json(users);
        })
        .catch(function(e){
            res.status(400).send();
        });
};

var userGetCountAll = function(req, res){
    db.sequelize.query("SELECT COUNT(*) FROM users", { type: db.sequelize.QueryTypes.SELECT})
        .then(function(count){
            res.json(count);
        })
        .catch(function(e){
            return res.status(500).json(e);
    });
};

var userCreate = function(req,res){
    var dateCutOff = new Date('2017-09-11 22:20:00');
    
    if (new Date() < dateCutOff) {
        var body = _.pick(req.body, 'full_name', 'email', 'user_id', 'picture_url');
        db.user.create(body)
            .then(function(user) {
                db.playerTeams.create({user_id: user.user_id, team_name: user.full_name + '\'s team'})
                    .then (function(team) {
                        db.teamStreaks.create({team_id: team.team_id, user_id: user.user_id, total: 0, current: true})
                        .then(function(streak){
                            res.json(user.toPublicJSON());
                        });
                    });                
            })
            .catch(function(e) {
                console.log(e);
                res.status(400).json(e);
            });
    } else {
        var e = {error: 'The cutoff time to sign up has passed.'};
        res.status(401).json(e);
    }       
};

var updateEmail = function(req, res) {
    var user_id = parseInt(req.params.user_id, 10);
    var body = _.pick(req.body, 'email');

    if (!body.hasOwnProperty('email')){
        res.status(401).send();
        return;
    }

    var attributes = { email : body.email};

    db.user.findOne({
        where: {
            user_id: user_id
        }
    })
        .then(function(user) {
            if (user) {
                return user.update(attributes)
                    .then(function(user){
                        res.json(user.toJSON());
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
    userGet: userGet,
    usersGetAll: usersGetAll,
    userCreate: userCreate,
    updateEmail: updateEmail,
    userGetCountAll: userGetCountAll,
    userCheck: userCheck 
};