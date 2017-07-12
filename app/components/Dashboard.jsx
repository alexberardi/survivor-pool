import React, {Component} from 'react';
import * as Redux from 'react-redux';

import TeamInfo from 'TeamInfo';
import Profile from 'Profile';

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="dashboard">
				<div className="actions-container">
					<Profile />
				</div>
				<div className="row">
					<div className="column small-centered small-11 medium-10 large-9">
						<div className="dashboard-title">Dashboard</div>
						<div className="container">
							<TeamInfo />
							<div className="card">
								<div className="card-title">
									This is another card
								</div>
								<div className="card-content">
									This is some card content.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
};

export default Redux.connect()(Dashboard);