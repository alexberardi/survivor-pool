import React from 'react';
import * as Redux from 'react-redux';

import TeamInfo from 'TeamInfo';
import Profile from 'Profile';

export var Dashboard = React.createClass({

	render: function() {
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
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default Redux.connect()(Dashboard);