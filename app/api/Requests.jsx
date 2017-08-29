import axios from 'axios';
import firebase from 'app/firebase/';;

module.exports = {
    get: function(address) {
       return axios.get(address).then(function(response) {
           return response;
       }).catch(function(error) {
            if(error.status == '401') {
                firebase.auth().signOut().then(() => {
                    localStorage.setItem('token', null);
                    location.reload();
                });
            }
       });
    },
    post: function(address, data) {
        return axios.post(address, {
            token: axios.defaults.headers.common['Authorization'],
            ...data
        }).then(function(response) {
            return response;
        }).catch(function(error) {
            if(error.status == '401') {
                firebase.auth().signOut().then(() => {
                    localStorage.setItem('token', null);
                    location.reload();
                });
            }
        }); 
    },
	put: function(address, data) {
		return axios.put(address, {
            token: axios.defaults.headers.common['Authorization'],
            ...data
        }).then(function(response) {
            return response;
        }).catch(function(error) {
            if(error.status == '401') {
                firebase.auth().signOut().then(() => {
                    localStorage.setItem('token', null);
                    location.reload();
                });
            }
        });

    },
    delete: function(address) {
        return axios.delete(address).then(function(response) {
            return response;
        }).catch(function(error) {
            if(error.status == '401') {
                firebase.auth().signOut().then(() => {
                    localStorage.setItem('token', null);
                    location.reload();
                });
            }
        });
    }
};
