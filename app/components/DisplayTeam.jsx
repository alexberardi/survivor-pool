import React, {Component} from 'react';
import * as Redux from 'react-redux';
import {Link, IndexLink} from 'react-router';
import * as actions from 'actions';
import FaEdit from 'react-icons/lib/fa/edit';

import ChangeTeam from 'ChangeTeam';

class DisplayTeam extends Component {
	constructor(props) {
        super(props);
        this.state = {displayName: props.displayName, teamName: props.teamName, teamID: props.teamID, changeTeam: false, uid: props.userID};
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
    componentDidMount() {
        //check for Pick
    }
	render() {
        var teamButton;
        var hasPick = false;
        var pickDisplay;
        // remove

        if(this.state.changeTeam) {
            teamButton = <ChangeTeam teamID={this.state.teamID} userID={this.state.uid} teamSubmit={this.handleTeamSubmit} teamName={this.state.teamName}/>
        } else {
            teamButton = <a href="#" className="team-link" onClick={this.handleTeamChange}>{this.state.teamName}<FaEdit size={25} style={{marginLeft: '12px'}} /></a>
        }
        
        if(!hasPick) {
			pickDisplay = <Link to="/picks" activeClassName="active"  activeStyle={{fontWeight: 'bold'}}>Make a Pick</Link>
		} else {
			// display pick
			pickDisplay = '';
		}

		return (
			<div className="card-container">
                <div className="card-title">
                   <div>{teamButton}</div>
                   <div className="team-title">Team</div>
                </div>
                <div className="card-content">
                    <div className="card-column">
                        <div className="card-column-container"> 
                            <p>This week's pick: {pickDisplay}</p>
                        </div>
                        <div className="card-column-container"> 
                            <p>Last week's pick:</p>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
};

export default Redux.connect()(DisplayTeam);