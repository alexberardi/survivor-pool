import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Users from 'Users';

import CreateTeam from 'CreateTeam';


class TeamInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {hasTeamName: false, teamName: "", uid: null};
		this.refreshTeamDisplay = this.refreshTeamDisplay.bind(this);
	}
	componentDidMount() {
		var {dispatch} = this.props;
		var {uid} = dispatch(actions.getUserAuthInfo());

		var that = this;
		var teamName;
		var hasTeamName;
		
		Users.getUser(uid).then(function(user) {
			if(user.data === null) {
				hasTeamName = false;
			} else {
				hasTeamName = true;
				teamName = user.data.userTeamName;
			}
		})
		.then(that.setState({hasTeamName, teamName, uid}));

	}
	refreshTeamDisplay(teamName) {
		this.setState({hasTeamName: true, teamName: teamName});
	}
	render() {
		const hasTeamName = this.state.teamName;

		let teamDisplay = null;
		if(hasTeamName) {
			teamDisplay = this.state.teamName;
		} else {
			teamDisplay = <CreateTeam userID={this.state.uid} refreshTeam={this.refreshTeamDisplay}/>
		}

		return (
			<div className="TeamInfo">
				{teamDisplay}
			</div>
		)
	}
};

export default Redux.connect()(TeamInfo);