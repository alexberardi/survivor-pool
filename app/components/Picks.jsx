import React, {Component} from 'react';
import * as Redux from 'react-redux';
import {Link, IndexLink, hashHistory} from 'react-router';

import Profile from 'Profile';

class Picks extends Component {
	constructor(props) {
		super(props);
    }
    toDashboard(e) {
        e.preventDefault();
        hashHistory.push('/dashboard');
    }
	render() {
		return (
			<div className="dashboard">
				<div className="actions-container">
                    <div className="dashboard-button-container">
                        <button type="button" className="dashboard-nav-button" onClick={this.toDashboard}>Dashboard</button>
                    </div>
					<Profile />
				</div>
				<div className="row">
					<div className="column small-centered small-11 medium-10 large-9">
						<div className="dashboard-title">Picks</div>
						<div className="container">
                            Picks
						</div>
					</div>
				</div>
				<div className="row">
					<div className="footer">
						Footer
					</div>
				</div>
			</div>
		)
	}
};

export default Redux.connect()(Picks);