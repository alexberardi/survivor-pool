import firebase, {googleProvider, facebookProvider} from 'app/firebase/';
import * as Requests from 'Requests';
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
			let authUser = {
				uid: results.user.uid,
				displayName: results.user.displayName,
				email: results.user.email,
				pictureURL: results.user.photoURL
			};


			firebase.auth().currentUser.getToken(true).then(function(token) {
				localStorage.setItem('token', token);
				Requests.get(`/users/exists/${authUser.uid}`).then(function(user) {
					if(user.data == null) {
						let user = {
							full_name: authUser.displayName, 
							email: authUser.email,
							user_id: authUser.uid,
							picture_url: authUser.pictureURL
						}
						Requests.post('/users', user).then(function(res) {
							console.log('created user');
						})
						.catch(function(error) {
							console.log(error);
							if(error.status == '401') {
			                    localStorage.setItem('token', null);
			            	}
						})
					}
				});
			})
			.catch(function(error) {
				firebase.auth().signOut().then(() => {
				});
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

export var refreshToken = () => {
	return (dispatch, getState) => {
		firebase.auth().currentUser.getToken(true).then(function(token) {
				localStorage.setItem('token', token);
			})
			.catch(function(error) {
				firebase.auth().signOut().then(() => {
				});
			});
	}
}

export var setWeek = (week) =>  {
	return {
		type: 'SET_WEEK',
		week
	}
}

export var getWeek = () =>  {
	return (dispatch, getState) => {
		return getState().week.currentWeek;
	}
}