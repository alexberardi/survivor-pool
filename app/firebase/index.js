import firebase from 'firebase';

try {
	var config = {
  	apiKey: process.env.API_KEY,
  	authDomain: process.env.AUTH_DOMAIN,
  	databaseURL: process.env.FIREBASEDATABASE_URL,
  	storageBucket: process.env.STORAGE_BUCKET,
  	messagingSenderId: process.env.MESSAGE_SENDER,
	credential: admin.credential.cert({
			"private_key": process.env.FIREBASE_PRIVATE_KEY,
			"client_email": process.env.FIREBASE_CLIENT_EMAIL
		})
	};

	firebase.initializeApp(config);
} catch (e) {

}

export var googleProvider = new firebase.auth.GoogleAuthProvider();
export var facebookProvider = new firebase.auth.FacebookAuthProvider();
export default firebase;