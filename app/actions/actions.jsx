import firebase, {googleProvider, facebookProvider} from 'app/firebase/';
import axios from 'axios';

export var startLogin = (provider) => {
	switch(provider) {
		case 'google':
			provider = googleProvider;
			break;
		case 'facebook':
			provider = facebookProvider;
			break;
	}
	return (dispatch, getState) => {
		return firebase.auth().signInWithPopup(provider).then((results) => {
			let user = {
				uid: results.user.uid,
				displayName: results.user.displayName,
				email: results.user.email
			};

			axios.get(`/users/${user.uid}`).then(function(res) {
				if(res.data === null) {
					axios.post('/users', {
						fullName: user.displayName, 
						email: user.email,
						userID: user.uid
					})
					.then(function(res) {
						console.log('created user');
					})
					.catch(function(error) {
						console.log(error);
					})
				}
			});

		}, (error) => {
			if(error.code == 'auth/account-exists-with-different-credential') {
				alert("You already have an account under a different credential!");
			} else {
				console.log(error.code);
			}
		});
	};
};

export var startLogout = () => {
	return (dispatch, getState) => {
		return firebase.auth().signOut().then(() => {
		});
	};
};

export var login = (user) => {
	return {
		type: 'LOGIN',
		user
	};
};

export var logout = () => {
	return {
		type: 'LOGOUT'
	};
};

export var getUserAuthInfo = () => {
	return (dispatch, getState) => {
		var {displayName, email, photoURL, uid } = getState().auth.user;
		return {
			displayName,
			email,
			photoURL,
			uid
		}
	} 
}
