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
    toAdmin(e) {
        e.preventDefault();
        hashHistory.push('/admin');
    }
	render() {
        let dashButton = null;
        let adminButton = null;

        if(this.props.page != 'Dashboard') {
            dashButton = <DashButton onClick={this.toDashboard} />;
        }

        if(this.props.admin) {
            adminButton = <AdminButton onClick={this.toAdmin} />;
        }

        return (
            <div className="nav">
			    <div className="logo-container">
                    <div className="nav-title">Survivor Pool</div>
			    </div>
				<div className="actions-container">
                    <div className="actions">
                        {adminButton}
                        {dashButton}
                        <Profile />
                    </div>
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

function AdminButton(props) {
    return (
        <div className="dashboard-button-container">
			<button type="button" className="dashboard-nav-button" onClick={props.onClick}>Admin</button>
		</div>
    )
}

export default Redux.connect()(Nav);