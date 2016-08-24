var db = require('../../db');
var _ = require('underscore');
var middleware = require('../../middleware')(db);


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
    var body = _.pick(req.body, 'first', 'last', 'email', 'password', 'teamName');
    db.user.create(body)
        .then(function(user) {
            db.userStreaks.create({userId: user.id, total: 0, current: true})
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

module.exports = {
    usersGetAll: usersGetAll,
    userCreate: userCreate,
    userLogin : userLogin,
    userLogout: userLogout
};