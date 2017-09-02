import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import firebase from 'firebase';
import axios from 'axios';

import DisplayTeam from 'DisplayTeam';
import AddTeam from 'AddTeam';

class TeamInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {uid: null, displayName: null, teams: null};
		this.refreshTeamDisplay = this.refreshTeamDisplay.bind(this);
		this.refreshPlayerTeams = this.refreshPlayerTeams.bind(this);
	}
	componentWillMount() {
		var {dispatch} = this.props;
		var {uid, displayName} = dispatch(actions.getUserAuthInfo());

		const that = this;

		firebase.auth().currentUser.getToken(true).then(function(token) {
			axios.defaults.headers.common['Authorization'] = token;
			axios.get(`/teams/${uid}`).then((teams) => {
				if(teams.data !== null) {
					that.setState({uid, displayName, teams: teams.data});
				}
			});
		});
	}
	refreshTeamDisplay(teamName) {
		this.setState({hasTeamName: true, teamName: teamName});
	}
	refreshPlayerTeams() {
		let userID = this.state.uid;
		const that = this;

		firebase.auth().currentUser.getToken(true).then(function(token) {
			axios.defaults.headers.common['Authorization'] = token;
			axios.get(`/teams/${userID}`).then((teams) => {
				if(teams.data !== null) {
					that.setState({teams: teams.data});
				}
			});
		});
	}
	render() {
		let userID = this.state.uid;
		let teams = this.state.teams;
		let displayName = this.state.displayName;
		let week = this.props.week;
		let addTeam;
		const dateCutOff = new Date('2017-09-11 22:20:00');

		var renderTeams = () => {
			if(teams === null || teams.length == 0) {
				this.refreshPlayerTeams();
				return 
			} 

			return teams.map((team) => {
				return (
					<div className="card" key={team.team_id}>
						<DisplayTeam teamID={team.team_id} displayName={displayName} teamName={team.team_name} hasPaid={team.has_paid} isActive={team.is_active} userID={userID} refreshTeam={this.refreshTeamDisplay} refreshPlayerTeams={this.refreshPlayerTeams} />
					</div>
				)
			});
		}

		if(new Date < dateCutOff) {
			addTeam = <div className="add-team-card">
						<AddTeam refreshPlayerTeams={this.refreshPlayerTeams}/>
					</div>
		}

		return (
			<div>
				<div className="card-row">
					{renderTeams()}
					{addTeam}
				</div>
			</div> 
		)
	}
};

export default Redux.connect()(TeamInfo);