import axios from 'axios';

module.exports = {
	getUser: function(authID) {
		return axios.get(`/users/${authID}`).then(function(res) {
			return res;
		}, function(res) {
			throw new Error(res);
		});
	}
};
