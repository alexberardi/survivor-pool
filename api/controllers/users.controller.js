var db = require('../../db');
var _ = require('underscore');

var userGet = function(req, res) {
    var authID = req.params.authid;

    db.user.findOne({
        where: {
            userID: authID
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
    var body = _.pick(req.body, 'first', 'last', 'email', 'userTeamName', 'userID');
    db.user.create(body)
        .then(function(user) {
            db.userStreaks.create({userID: user.userID, total: 0, current: true})
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
    var body = _.pick(req.body, 'userID', 'token');
    db.tokens.create(body)
        .then(function(token) {
            res.json(token);
        });
}

var userLogout = function(req, res) {
    var body = _.pick(req.body, 'userID');
    db.tokens.destroy({where: {userID: body.userID}})
        .then(function(token){
            res.json();
        });
}

// var userLogin = function(req, res) {
//     var body = _.pick(req.body, 'email', 'password');
//     var userInstance;

//     db.user.authenticate(body)
//         .then(function(user) {

//             var token = user.generateToken('authentication');
//             userInstance = user;

//             return db.token.create({
//                 token: token
//             })
//                 .then(function(tokenInstance) {
//                     if (token) {
//                         res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
//                     } else {
//                         res.status(401).send();
//                     }
//                 })
//         })
//         .catch(function(e) {
//             res.status(401).send();
//         });
// };

// var userLogout = function(req, res) {
//     middleware.requireAuthentication
//         .then(
//             function(token){
//                 req.token.destroy()
//                     .then(function () {
//                         res.status(204).send();
//                     }).catch(function (e) {
//                     res.status(500).send();
//                 });
//             }
//         )
// };

var updateTeamName = function(req, res) {
    var userID = parseInt(req.params.userID, 10);
    var body = _.pick(req.body, 'teamName');

    if (!body.hasOwnProperty('teamName')){
        res.status(401).send();
        return;
    }

    var attributes = { teamName : body.teamName};

    db.user.findOne({
        where: {
            userID: userID
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
    var userID = parseInt(req.params.userID, 10);
    var body = _.pick(req.body, 'email');

    if (!body.hasOwnProperty('email')){
        res.status(401).send();
        return;
    }

    var attributes = { email : body.email};

    db.user.findOne({
        where: {
            userID: userID
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


// var updatePassword = function(req, res) {
//     var userID = parseInt(req.params.userid, 10);
//     var body = _.pick(req.body, 'oldPassword', 'password');

//     if (!body.hasOwnProperty('password')){
//         res.status(401).send();
//         return;
//     }

//     var attributes = { password : body.password};

//     db.user.findOne({
//         where: {
//             id: userID
//         }
//     })
//         .then(function(user) {
//             if (user) {
//                 if (user.checkOldPassword(body.oldPassword)){
//                     return user.update(attributes)
//                         .then(function(user){
//                             res.json(user.toJSON());
//                         }, function(e){
//                             res.status(400).json(e);
//                         });
//                 } else {
//                     res.status(404).send();
//                 }
//             } else {
//                 res.status(404).send();
//             }
//         }, function(){
//             res.status(500).send();
//         });
// };

module.exports = {
    userGet: userGet,
    usersGetAll: usersGetAll,
    userCreate: userCreate,
    userLogin : userLogin,
    userLogout: userLogout,
    updateTeamName: updateTeamName,
    //updatePassword: updatePassword,
    updateEmail: updateEmail,
    userGetCountAll: userGetCountAll 
};