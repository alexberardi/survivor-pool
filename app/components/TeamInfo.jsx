import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';

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

		var that = this;
		var teamName;
		var hasTeam;
		var userTeams;

		Requests.get(`/teams/${uid}`).then(function(teams) {
			if(teams.data !== null) {
				userTeams = teams.data;
			}
			that.setState({uid, displayName, teams: userTeams});
		});
	}
	refreshTeamDisplay(teamName) {
		this.setState({hasTeamName: true, teamName: teamName});
	}
	refreshPlayerTeams() {
		let userID = this.state.uid;
		let teams = this.state.teams;
		let userTeams;
		var that = this;

		Requests.get(`/teams/${userID}`).then(function(teams) {
			if(teams.data !== null) {
				userTeams = teams.data;
			}
			that.setState({teams: userTeams});
		});
	}
	render() {
		let userID = this.state.uid;
		let teams = this.state.teams;
		let displayName = this.state.displayName;

		var renderTeams = () => {
			if(teams === null || teams.length == 0) {
				return 
			} 

			return teams.map((team) => {
				return (
					<div className="card" key={team.teamID}>
						<DisplayTeam teamID={team.teamID} displayName={displayName} teamName={team.teamName} hasPaid={team.hasPaid} isActive={team.isActive} userID={userID} refreshTeam={this.refreshTeamDisplay} refreshPlayerTeams={this.refreshPlayerTeams}/>
					</div>
				)
			});
		}

		return (
			<div>
				<div className="card-row">
					{renderTeams()}
					<div className="card">
						<AddTeam refreshPlayerTeams={this.refreshPlayerTeams}/>
					</div>
				</div>
			</div> 
		)
	}
};

export default Redux.connect()(TeamInfo);