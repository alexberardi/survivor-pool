import React from 'react';
import {Route, Router, IndexRoute, hashHistory, browserHistory} from 'react-router';
import Dashboard from 'Dashboard';
import Login from 'Login';
import Picks from 'Picks';
import Admin from 'Admin';
import firebase from 'app/firebase/';

var requireLogin = (nextState, replace, next) => {
	if (!firebase.auth().currentUser) {
		replace('/');
	}
	next();
};

var userLoggedIn = (nextState, replace, next) => {
	if (firebase.auth().currentUser) {
		replace('/dashboard');
	}
	next();
};


export default (
	<Router history={hashHistory}>
		<Route path="/">
			<Route path="dashboard" component={Dashboard} onEnter={requireLogin}/>
			<Route path="picks/:teamID" component={Picks} onEnter={requireLogin}/>
			<Route path="admin" component={Admin} onEnter={requireLogin}/>
			<IndexRoute component={Login} onEnter={userLoggedIn}/>
		</Route>
	</Router>
);