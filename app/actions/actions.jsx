import firebase, {googleProvider} from 'app/firebase/';

export var startLogin = (provider) => {
	switch(provider) {
		case 'google':
			provider = googleProvider;
			break;
		case 'github':
		  provider = githubProvider;
		  break;
		case 'facebook':
			provider = facebookProvider;
			break;
	}
	return (dispatch, getState) => {
		return firebase.auth().signInWithPopup(provider).then((results) => {
			console.log('Logged In');
		}, (error) => {
			console.log('Unable to Auth', error);
		});
	};
};

export var startLogout = () => {
	return (dispatch, getState) => {
		return firebase.auth().signOut().then(() => {
			console.log('Logged out');
		});
	};
};

export var login = (uid) => {
	return {
		type: 'LOGIN',
		uid
	};
};

export var logout = () => {
	return {
		type: 'LOGOUT'
	};
};