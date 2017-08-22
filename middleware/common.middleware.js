var admin = require("firebase-admin");
var db = require('../db.js');

var serviceAccount;
if (process.env.NODE_ENV == 'production') {
  serviceAccount = {
		"private_key": process.env.FIREBASE_PRIVATE_KEY,
		"client_email": process.env.FIREBASE_CLIENT_EMAIL
		}
} else {
    try{
      serviceAccount = require("../app/firebase/serviceAccountKey.json");    
    } catch (e) {

    }  
}

 admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://survivor-pool-4e4e2.firebaseio.com"
 });

var checkAuthentication = function(req, res, next) {
			admin.auth().verifyIdToken(req.get('Authorization') || '')
    		.then(function(decodedToken) {
      		next();
    		})
    		.catch(function(error) {
          console.log('Invalid Token.');
          console.log(error);
          res.status(401).send();
    		});
}

var checkTeamID = function(req, res, next) {
    let userID = req.body.userID ? req.body.userID : req.params.userID;
    db.playerTeams.findOne({
      where: {
        teamID: req.params.teamID,
        userID: userID
      }
    })
    .then(function(team){
      if(team) {
        next();
      } else {
        res.status(401).send();
      }
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
    checkTeamID: checkTeamID
  };