import axios from 'axios';
import firebase from 'app/firebase/';

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;

var getRequest = function(address, data) {
   return axios.get(address);
}

var postRequest = function(address, data) {
    return axios.post(address, {
        ...data
    });
}

var putRequest = function(address, data) {
    return axios.put(address, {
        ...data
    });
}

module.exports = {
    makeRequest: function(address, method, data = {}) {
        let request;
        switch(method) {
            case 'get':
                request = getRequest.bind(null, address, data);
                break;
            case 'post':
                request = postRequest.bind(null, address, data);
                break;
            case 'put':
                request = putRequest.bind(null, address, data);
                break;
            default:
                return 'No method specified';
        }

        return request().then(function(response) {
            return response;
        })
        .catch(function(error) {
            if(error.status == '401') {
                firebase.auth().signOut().then(() => {});
            } else {
                console.log(error);
            }
        })
    }
};
