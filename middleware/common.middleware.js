var admin = require("firebase-admin");
var db = require('../db.js');

var serviceAccount, databaseURL;
if (process.env.NODE_ENV == 'production') {
  console.log('here');
  serviceAccount = {
    "project_id": "survivor-pool-4e4e2",
		"private_key": process.env.FIREBASE_PRIVATE_KEY,
		"client_email": process.env.FIREBASE_CLIENT_EMAIL
		};
    databaseURL = "https://survivor-pool-4e4e2.firebaseio.com";
} else {
    try{
      serviceAccount = require("../app/firebase/serviceAccountKey.json"); 
      databaseURL = "https://survivor-pool-dev.firebaseio.com";   
    } catch (e) {

    }  
}

 admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: databaseURL
 });

var checkAuthentication = function(req, res, next) {
			admin.auth().verifyIdToken(req.get('Authorization') || '')
    		.then(function(decodedToken) {
    		  if(req.params.user_id) {
    		    if (req.params.user_id === decodedToken.user_id){
              req.body.user_id = decodedToken.user_id;
              next();
            } else {
              console.log('Invalid User_ID in params.');
              res.status(401).send();
            }
          } else {
            req.body.user_id = decodedToken.user_id;
            next();
          }
    		})
    		.catch(function(error) {
          console.log('Invalid Token. 2 ');
          console.log(error);
          res.status(401).send();
    		});
}

var checkTeamID = function(req, res, next) {
    let user_id;

    if (req.params.user_id) {
      user_id = req.params.user_id;
    } else {
      user_id = req.body.user_id || '';
    }

    db.playerTeams.findOne({
      where: {
        team_id: req.params.team_id,
        user_id: user_id
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
          var user_id = decodedToken.uid;
          db.user.findOne({
            where: {
              user_id: user_id,
              is_admin: true
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