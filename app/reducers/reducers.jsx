var moment = require('moment');

export var authReducer = (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				user: action.user
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
}