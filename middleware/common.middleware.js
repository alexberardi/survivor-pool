var admin = require("firebase-admin");

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

  module.exports = {
  	checkAuthentication: checkAuthentication
  };