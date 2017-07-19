import React, {Component} from 'react';
import * as Redux from 'react-redux';
import {Link, IndexLink, hashHistory} from 'react-router';

import Profile from 'Profile';

class Nav extends Component {
    constructor(props) {
        super(props);
    }
    toDashboard(e) {
        e.preventDefault();
        hashHistory.push('/dashboard');
    }
	render() {
        let dashButton = null;

        if(this.props.page != 'Dashboard') {
            dashButton = <DashButton onClick={this.toDashboard} />;
        }

        return (
            <div className="nav">
			    <div className="logo-container">
			    </div>
				<div className="actions-container">
                    {dashButton}
					<Profile />
				</div>
		    </div>
        )
    }
};

function DashButton(props) {
    return (
        <div className="dashboard-button-container">
			<button type="button" className="dashboard-nav-button" onClick={props.onClick}>Dashboard</button>
		</div>
    )
}

export default Redux.connect()(Nav);