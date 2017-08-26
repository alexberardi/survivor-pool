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
	componentDidMount() {
		var {dispatch} = this.props;
		var {uid, displayName} = dispatch(actions.getUserAuthInfo());

		const that = this;

		Requests.get(`/teams/${uid}`).then(function(teams) {
			if(teams.data !== null) {
				that.setState({uid, displayName, teams: teams.data});
			}
		});
	}
	refreshTeamDisplay(teamName) {
		this.setState({hasTeamName: true, teamName: teamName});
	}
	refreshPlayerTeams() {
		let userID = this.state.uid;
		const that = this;

		Requests.get(`/teams/${userID}`).then(function(teams) {
			if(teams.data !== null) {
				that.setState({teams: teams.data});
			}
		});
	}
	render() {
		let userID = this.state.uid;
		let teams = this.state.teams;
		let displayName = this.state.displayName;
		let week = this.props.week;

		var renderTeams = () => {
			if(teams === null || teams.length == 0) {
				this.refreshPlayerTeams();
				return (
					<div className="card">
						Loading Teams...
					</div>
				)
			} 

			return teams.map((team) => {
				return (
					<div className="card" key={team.team_id}>
						<DisplayTeam teamID={team.team_id} displayName={displayName} teamName={team.team_name} hasPaid={team.has_paid} isActive={team.is_active} userID={userID} refreshTeam={this.refreshTeamDisplay} refreshPlayerTeams={this.refreshPlayerTeams} />
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