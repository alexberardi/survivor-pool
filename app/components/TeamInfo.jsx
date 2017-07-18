import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';

import CreateTeam from 'CreateTeam';
import DisplayTeam from 'DisplayTeam';


class TeamInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {hasTeamName: false, teamName: "", uid: null, displayName: null};
		this.refreshTeamDisplay = this.refreshTeamDisplay.bind(this);
	}
	componentDidMount() {
		var {dispatch} = this.props;
		var {uid, displayName} = dispatch(actions.getUserAuthInfo());

		var that = this;
		var teamName;
		var hasTeamName;

		Requests.makeRequest(`/users/${uid}`, 'get').then(function(user) {
			if(user.data === null) {
				hasTeamName = false;
			} else {
				teamName = user.data.userTeamName;
				hasTeamName = teamName === null ? false : true;
			}
			that.setState({hasTeamName, teamName, uid, displayName});
		});
	}
	refreshTeamDisplay(teamName) {
		this.setState({hasTeamName: true, teamName: teamName});
	}
	render() {
		let hasTeamName = this.state.hasTeamName;
		let teamDisplay = null;

		if(hasTeamName) {
			teamDisplay = <DisplayTeam displayName={this.state.displayName} teamName={this.state.teamName} refreshTeam={this.refreshTeamDisplay} userID={this.state.uid}/>
		} else {
			teamDisplay = <CreateTeam userID={this.state.uid} refreshTeam={this.refreshTeamDisplay} title={'Looks like you need a team name!'}/>
		}

		return (
			<div className="card">
				{teamDisplay}
			</div>
		)
	}
};

export default Redux.connect()(TeamInfo);