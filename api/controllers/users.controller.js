var db = require('../../db');
var _ = require('underscore');

var usersGetAll = function(req, res) {
    db.user.findAll()
        .then(function(users){
            res.json(users);
        })
        .catch(function(e){
            res.status(400).send();
        });
}

var userCreate = function(req,res){
    var body = _.pick(req.body, 'first', 'last', 'email', 'password', 'teamname');
    db.user.create(body)
        .then(function(user) {
            db.userStreaks.create({userid: user.id, total: 0, current: true})
                .then(function(streak){
                    res.json(user.toPublicJSON());
            });
        })

        .catch(function(e) {
            console.log(e);
            res.status(400).json(e);
        });
};

var userLogin = function(req, res) {
    var body = _.pick(req.body, 'email', 'password');
    var userInstance;

    db.user.authenticate(body)
        .then(function(user) {

            var token = user.generateToken('authentication');
            userInstance = user;

            return db.token.create({
                token: token
            })
                .then(function(tokenInstance) {
                    if (token) {
                        res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
                    } else {
                        res.status(401).send();
                    }
                })
        })
        .catch(function(e) {
            res.status(401).send();
        });
}

var userLogout = function(req, res) {
    middleware.requireAuthentication
        .then(
            function(token){
                req.token.destroy()
                    .then(function () {
                        res.status(204).send();
                    }).catch(function (e) {
                    res.status(500).send();
                });
            }
        )
};

var updateTeamName = function(req, res) {
    var userID = parseInt(req.params.id, 10);
    var body = _.pick(req.body, 'teamname');

    if (!body.hasOwnProperty('teamname')){
        res.status(401).send();
        return;
    }

    var attributes = { teamname : body.teamname};

    db.user.findOne({
        where: {
            id: userID
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

var updateEmail = function(req, res) {
    var userID = parseInt(req.params.id, 10);
    var body = _.pick(req.body, 'email');

    if (!body.hasOwnProperty('email')){
        res.status(401).send();
        return;
    }

    var attributes = { email : body.email};

    db.user.findOne({
        where: {
            id: userID
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


var updatePassword = function(req, res) {
    var userID = parseInt(req.params.id, 10);
    var body = _.pick(req.body, 'oldPassword', 'password');

    if (!body.hasOwnProperty('password')){
        res.status(401).send();
        return;
    }

    var attributes = { password : body.password};

    db.user.findOne({
        where: {
            id: userID
        }
    })
        .then(function(user) {
            if (user) {
                if (user.checkOldPassword(body.oldPassword)){
                    return user.update(attributes)
                        .then(function(user){
                            res.json(user.toJSON());
                        }, function(e){
                            res.status(400).json(e);
                        });
                } else {
                    res.status(404).send();
                }
            } else {
                res.status(404).send();
            }
        }, function(){
            res.status(500).send();
        });
};

module.exports = {
    usersGetAll: usersGetAll,
    userCreate: userCreate,
    userLogin : userLogin,
    userLogout: userLogout,
    updateTeamName: updateTeamName,
    updatePassword: updatePassword,
    updateEmail: updateEmail
};