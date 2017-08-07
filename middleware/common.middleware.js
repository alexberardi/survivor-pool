var admin = require("firebase-admin");
var db = require('../db.js');

var serviceAccount = require("../app/firebase/serviceAccountKey.json");

 admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://survivor-pool-4e4e2.firebaseio.com"
 });

var checkAuthentication = function(req, res, next) {
			admin.auth().verifyIdToken(req.get('Authorization') || '')
    		.then(function(decodedToken) {
          req.userID = decodedToken.user_id;
      		next();
    		})
    		.catch(function(error) {
          console.log('Invalid Token.');
          res.status(401).send();
    		});
}

var checkAuthenticationWithTeamID = function(req, res, next) {
    db.playerTeams.findOne({
      where: {
        teamID: req.params.teamID,
        userID: req.userID
      }
    })
    .then(function(team){
      next();
    })
    .catch(function(error) {
      res.status(401).send();
    })
}

var checkAdmin = function (req, res, next) {
  admin.auth().verifyIdToken(req.get('Authorization') || '')
        .then(function(decodedToken) {
          var userID = decodedToken.uid;
          db.user.findOne({
            where: {
              userID: userID,
              isAdmin: true
            }
          })
          .then(function(admin) {
            if (admin) {
              next();
            } else {
              console.log('not administrator');
              res.status(401).send();
            }
          })
          .catch(function(e) {
              console.log('not administrator');
              res.status(401).send();
          });
        })
        .catch(function(error) {
          console.log('Invalid Token 2.');
          res.status(401).send();
        });
}

  module.exports = {
  	checkAuthentication: checkAuthentication,
    checkAdmin: checkAdmin,
    checkAuthenticationWithTeamID: checkAuthenticationWithTeamID
  };