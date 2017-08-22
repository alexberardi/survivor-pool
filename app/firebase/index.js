import firebase from 'firebase';

try {
	var config = {
	credential: firebase.credential.cert({
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL
	}),
  	apiKey: process.env.API_KEY,
  	authDomain: process.env.AUTH_DOMAIN,
  	databaseURL: process.env.FIREBASEDATABASE_URL,
  	storageBucket: process.env.STORAGE_BUCKET,
  	messagingSenderId: process.env.MESSAGE_SENDER
	};

	firebase.initializeApp(config);
} catch (e) {

}

export var googleProvider = new firebase.auth.GoogleAuthProvider();
export var facebookProvider = new firebase.auth.FacebookAuthProvider();
export default firebase;