import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

import * as Requests from 'Requests';
import TeamInfo from 'TeamInfo';
import Nav from 'Nav';
import Footer from 'Footer';
import FaExclamation from 'react-icons/lib/fa/exclamation';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {userID: null, displayName: null, isAdmin: false, hasPaid: true};
	}
	componentWillMount() {
		var {dispatch} = this.props;
		var {uid, displayName} = dispatch(actions.getUserAuthInfo());

		var that = this;
		var displayName;
		var isAdmin = this.state.isAdmin;
		var hasPaid = this.state.hasPaid;
		Requests.get(`/users/${uid}`).then(function(user) {
			displayName = user.data.displayName;
			isAdmin = user.data.isAdmin;
			that.setState({userID: uid, displayName, isAdmin});
		});
		Requests.get(`/teams/${uid}`).then(function(teams) {
			if(teams.data !== null) {
				let playerTeams = teams.data;
				hasPaid = playerTeams.every(team => team.hasPaid);
			}
			that.setState({hasPaid});
		});
	}
	render() {
		let isAdmin = this.state.isAdmin;
		let hasPaid = this.state.hasPaid;

		let adminPage;
		let message;

		if(!hasPaid) {
			message = <div className="message"><FaExclamation size={40} style={{marginLeft: '12px', marginRight: '12px'}} /> <div className="message-text">You haven't paid entry for the season.</div></div>;
		}

		return (
			<div className="dashboard">
				<Nav admin={isAdmin} page={'Dashboard'}/>
				<div className="row">
					<div className="column small-centered small-11 medium-10 large-9">
						<div className="dashboard-title">Dashboard</div>
						{message}
						<div className="container">
							<TeamInfo />
						</div>
					</div>
				</div>
				<div className="row">
					<Footer />
				</div>
			</div>
		)
	}
};

export default Redux.connect()(Dashboard);