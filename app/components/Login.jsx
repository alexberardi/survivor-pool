import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

export var Login = React.createClass({
	oAuthLogin(provider) {
		var {dispatch} = this.props;
		dispatch(actions.startLogin(provider));
	},
	render() { 
		return (
			<div className="app-container">
                <div className="app-header">
                    <div className="login-title">Survivor Pool</div>
                </div>
                <div className="app-body">
                    <div className="buttons-container">
                        <button type="button" className="loginBtn loginBtn--google" onClick={() => this.oAuthLogin('google')}>Login with Google</button>
                        <button type="button" className="loginBtn loginBtn--facebook" onClick={() => this.oAuthLogin('facebook')}>Login with Facebook</button>
                    </div>
                </div>
            </div>
		)
	}
});

export default Redux.connect()(Login);