import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

import ChangeTeam from 'ChangeTeam';

class DisplayTeam extends Component {
	constructor(props) {
        super(props);
        this.state = {displayName: props.displayName, teamName: props.teamName, changeTeam: false, uid: props.userID};
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.handleTeamSubmit = this.handleTeamSubmit.bind(this);
    }
    handleTeamChange(e) {
        e.preventDefault();
        this.setState({changeTeam: true});
    }
    handleTeamSubmit(teamName) {
        this.props.refreshTeam(teamName);
        this.setState({changeTeam: false, teamName: teamName});
    }
	render() {
        var teamButton;
        if(this.state.changeTeam) {
            teamButton = <ChangeTeam userID={this.state.uid} teamSubmit={this.handleTeamSubmit} teamName={this.state.teamName}/>
        } else {
            teamButton = <a href="#" className="team-link" onClick={this.handleTeamChange}>{this.state.teamName}</a>
        }

		return (
			<div>
                <div className="card-title">
                    Your Team
                </div>
                <div className="card-content">
                    {teamButton}
                </div>
            </div>
		)
	}
};

export default Redux.connect()(DisplayTeam);