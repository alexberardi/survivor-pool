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
    var body = _.pick(req.body, 'fullName', 'email', 'userTeamName', 'userID');
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
    updateTeamName: updateTeamName,
    //updatePassword: updatePassword,
    updateEmail: updateEmail,
    userGetCountAll: userGetCountAll 
};