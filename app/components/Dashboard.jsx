import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

export var Dashboard = React.createClass({
	onLogout(e) {
		e.preventDefault();
		var {dispatch} = this.props;

		dispatch(actions.startLogout());
	},
	render() {
		return (
			<div className="dashboard">
				<div className="actions-container">
					<button type="button" className="primary-button" onClick={this.onLogout}>Logout</button>
				</div>
				<div className="row">
					<div className="column small-centered small-11 medium-6 large-5">
						<div className="dashboard-title">Dashboard</div>
						<div className="container">
							Where am I?
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default Redux.connect()(Dashboard);