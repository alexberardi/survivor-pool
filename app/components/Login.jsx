import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

import FaExclamation from 'react-icons/lib/fa/exclamation';

class Login extends Component {
    constructor(props) {
        super(props);
    }
	oAuthLogin(provider) {
		var {dispatch} = this.props;
		dispatch(actions.startLogin(provider));
	}
	render() { 
        const dateCutOff = new Date('2017-09-12T02:20:00.000Z');
        let registrationMessage;

        if(new Date > dateCutOff) { 
            registrationMessage = <RenderMessage text={'Registration for current season is closed.'}/>
        }

		return (
			<div className="app-container">
                <div className="app-header">
                    <div className="login-title">Survivor Pool</div>
                </div>
                <div className="app-body">
                    <div className="login-actions-container">
                        <div className="login-message-container">
                            {registrationMessage}
                        </div>
                        <div className="buttons-container">
                            <button type="button" className="loginBtn loginBtn--google" onClick={() => this.oAuthLogin('google')}>Login with Google</button>
                            <button type="button" className="loginBtn loginBtn--facebook" onClick={() => this.oAuthLogin('facebook')}>Login with Facebook</button>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
};

function RenderMessage(props) {
    return (
        <div className='message-urgent'>
            <FaExclamation width={40} height={40} style={{marginLeft: '12px', marginRight: '20px'}} /> 
            <div className="message-text">{props.text}</div>
        </div>
    )
}

export default Redux.connect()(Login);