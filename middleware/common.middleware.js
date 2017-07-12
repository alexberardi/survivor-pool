var admin = require("firebase-admin");

var serviceAccount = require("../app/firebase/serviceAccountKey.json");

 admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://survivor-pool-4e4e2.firebaseio.com"
 });

var checkAuthentication = function(req, res, next) {
	console.log(req.body.name);     
			res.status(200).send();
			admin.auth().verifyIdToken(req.body.idToken)
    		.then(function(decodedToken) {
    			console.log(decodedToken);
      		var uid = decodedToken.uid;
      		res.status(200).send();
    		})
    		.catch(function(error) {
    			console.log(error);
    		});
}

  module.exports = {
  	checkAuthentication: checkAuthentication
  };