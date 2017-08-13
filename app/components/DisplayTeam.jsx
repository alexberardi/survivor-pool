import React, {Component} from 'react';
import * as Redux from 'react-redux';
import {Link, IndexLink} from 'react-router';
import * as actions from 'actions';
import * as Requests from 'Requests';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaFrownO from 'react-icons/lib/fa/frown-o';

import ChangeTeam from 'ChangeTeam';

class DisplayTeam extends Component {
	constructor(props) {
        super(props);
        this.state = {
            displayName: props.displayName, 
            teamName: props.teamName, 
            teamID: props.teamID, 
            isActive: props.isActive,
            changeTeam: false, 
            deleteTeam: false, 
            uid: props.userID
        };
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.handleTeamSubmit = this.handleTeamSubmit.bind(this);
        this.handleTeamDelete = this.handleTeamDelete.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
    }
    handleTeamChange(e) {
        e.preventDefault();
        this.setState({changeTeam: true});
    }
    handleTeamSubmit(teamName) {
        this.props.refreshTeam(teamName);
        this.setState({changeTeam: false, teamName: teamName});
    }
    handleTeamDelete(e) {
        e.preventDefault();
        this.setState({deleteTeam: true});
    }
    deleteTeam(e) {
        e.preventDefault();
        let teamID = this.state.teamID;
        let that = this;

        Requests.delete(`/teams/${teamID}`).then(function(response) {
            that.setState({deleteTeam: false});
            that.props.refreshPlayerTeams();
        });
    }
    cancelDelete(e) {
        e.preventDefault();
        this.setState({deleteTeam: false});
    }
    componentDidMount() {
        //check for Pick
    }
	render() {
        var teamButton;
        var hasPick = false;
        var pickDisplay;
        var deleteButton;
        const isActive = this.state.isActive;

        if(isActive) {
            if(this.state.changeTeam) {
                teamButton = <ChangeTeam teamID={this.state.teamID} userID={this.state.uid} teamSubmit={this.handleTeamSubmit} teamName={this.state.teamName}/>
            } else {
                teamButton = <a href="#" className="team-link" onClick={this.handleTeamChange}>{this.state.teamName}<FaEdit size={25} style={{marginLeft: '12px'}} /></a>
            }

            if(this.state.deleteTeam) {
                deleteButton = <div className="confirmation">Are you sure you want to delete this team? 
                        <div className="confirmation-link">
                            <a href="#" className="delete-team-confirm" onClick={this.deleteTeam}>Yes</a>
                            <a href="#" className="delete-team-cancel" onClick={this.cancelDelete}>No</a>
                        </div>
                    </div>
            } else {
                deleteButton = <a href="#" className="delete-team-link" onClick={this.handleTeamDelete}><FaTrashO size={25} /></a>
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
                    <div className="team-delete-container">{deleteButton}</div>
                </div>
            )
        } else {
            // Team is inactive
            return (
                <div className="card-container">
                    <div className="card-title">
                        <div>{this.state.teamName}</div>
                        <div className="team-title">Team <FaFrownO size={20} style={{color: 'red'}}/></div>
                    </div>
                    <div className="card-content">
                        <div className="team-eliminated">
                            Eliminated
                        </div>
                    </div>
                </div>
            )
        }
	}
};

export default Redux.connect()(DisplayTeam);