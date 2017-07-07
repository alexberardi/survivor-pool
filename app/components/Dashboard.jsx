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
			<div>
				<div className="page-actions">
					<a href="#" onClick={this.onLogout}>Logout</a>
				</div>
				<h1 className="page-title">Dashboard</h1>
				<div className="row">
					<div className="column small-centered small-11 medium-6 large-5">
						<div className="container">
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default Redux.connect()(Dashboard);