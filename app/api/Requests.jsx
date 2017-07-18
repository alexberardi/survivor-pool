import axios from 'axios';
import firebase from 'app/firebase/';

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;

module.exports = {
    get: function(address) {
       return axios.get(address).then(function(response) {
           return response;
       }).catch(function(error) {
            if(error.status == '401') {
                firebase.auth().signOut().then(() => {
                });
            }
       });
    },
    post: function(address, data) {
        return axios.post(address, {
            token,
            ...data
        }).then(function(response) {
            return response;
        }).catch(function(error) {
            if(error.status == '401') {
                firebase.auth().signOut().then(() => {
                });
            }
        }); 
    },
	put: function(address, data) {
		return axios.put(address, {
            token,
            ...data
        }).then(function(response) {
            return response;
        }).catch(function(error) {
            if(error.status == '401') {
                firebase.auth().signOut().then(() => {
                });
            }
        });

	}
};
