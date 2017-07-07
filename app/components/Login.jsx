import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

export var Login = React.createClass({
	googleLogin() {
		var {dispatch} = this.props;
		dispatch(actions.startLogin('google'));
	},
	render() { 
		return (
			<div className="app-container">
        <div className="app-header">
            <div className="login-title">Survivor Pool</div>
        </div>
        <div className="app-body">
            <div className="buttons-container">
                <button type="button" className="login-button" onClick={this.googleLogin}>
                </button>
            </div>
        </div>
      </div>
		)
	}
});

export default Redux.connect()(Login);