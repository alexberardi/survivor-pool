var uuid = require('node-uuid');
var moment = require('moment');

export var authReducer = (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				uid: action.uid
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
}