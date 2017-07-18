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
      		var uid = decodedToken.uid;
      		res.status(200).send();
    		})
    		.catch(function(error) {
          console.log('Invalid Token.');
          res.status(401).send();
    		});
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
              console.log('is Administrator');
              res.status(200).send();
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
    checkAdmin: checkAdmin
  };