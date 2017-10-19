import React, {Component} from 'react';
import * as Redux from 'react-redux';
import {Link, IndexLink} from 'react-router';
import firebase from 'firebase';
import axios from 'axios';
import * as actions from 'actions';

import PickHistory from 'PickHistory';

import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaCheck from 'react-icons/lib/fa/check';
import FaClose from 'react-icons/lib/fa/close';

import ChangeTeam from 'ChangeTeam';

class DisplayTeam extends Component {
	constructor(props) {
        super(props);
        this.state = {
            displayName: props.displayName, 
            teamName: props.teamName, 
            teamID: props.teamID, 
            isActive: props.isActive,
            hasPaid: props.hasPaid,
            pick: null,
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
        const that = this;

        firebase.auth().currentUser.getToken(true).then(function(token) {
            axios.defaults.headers.common['Authorization'] = token;
            axios.delete(`/teams/${that.state.uid}/${teamID}`).then(function(response) {
                that.setState({deleteTeam: false});
                that.props.refreshPlayerTeams();
            });
        });
    }
    cancelDelete(e) {
        e.preventDefault();
        this.setState({deleteTeam: false});
    }
    componentWillMount() {
        const that = this;
        if(this.state.isActive) {
            firebase.auth().currentUser.getToken(true).then(function(token) {
                axios.defaults.headers.common['Authorization'] = token;
                axios.get(`/picks/${that.state.uid}/${that.state.teamID}`).then(function(pick) {
                    if(pick.data[0]) {  
                        that.setState({pick: pick.data[0]});
                    }
                });
            });
        }
    }
	render() {
        var teamButton;
        var hasPick = this.state.pick === null ? false : true;
        var pickDisplay;
        var deleteButton;

        const isActive = this.state.isActive;

        if(isActive) {
            if(this.state.changeTeam) {
                teamButton = <ChangeTeam teamID={this.state.teamID} userID={this.state.uid} teamSubmit={this.handleTeamSubmit} teamName={this.state.teamName} admin={false}/>
            } else {
                teamButton = <div>{this.state.teamName}<a href="#" className="change-team-link" onClick={this.handleTeamChange}><FaEdit size={25} style={{marginLeft: '12px'}} /></a></div>
            }

            if(this.state.deleteTeam) {
                deleteButton = <div className="confirmation">Are you sure you want to delete this team? 
                        <div className="confirmation-link">
                            <a href="#" className="delete-team-confirm" onClick={this.deleteTeam}>Yes</a>
                            <a href="#" className="delete-team-cancel" onClick={this.cancelDelete}>No</a>
                        </div>
                    </div>
            } else if(!this.state.hasPaid) {
                deleteButton = <a href="#" className="delete-team-link" onClick={this.handleTeamDelete}><FaTrashO size={25} /></a>
            }
            
            if(!hasPick) {
                pickDisplay = <Link to={`picks/${this.state.teamID}`} activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Make a Pick</Link>
            } else {
                let logoURL = `/images/${this.state.pick.team_name.toLowerCase()}.gif`;
                pickDisplay = <GetCurrentPick pickURL={logoURL} teamID={this.state.teamID} />
            }

            return (
                <div className="card-container">
                    <div className="active-container">
                        <FaCheck size={20} style={{color: '#00ad61'}}/>
                    </div>
                    <div className="card-title">
                        <div>{teamButton}</div>
                        <div className="team-title">Team</div>
                    </div>
                    <div className="card-content">
                        <div className="card-column">
                            <div className="card-column-container"> 
                                <div>{pickDisplay}</div>
                            </div>
                            <div className="card-column-container">
                                <div className="pick-history-title">Pick History</div>
                                <PickHistory userID={this.state.uid} teamID={this.state.teamID}/>
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
                    <div className="active-container">
                        <FaClose size={20} style={{color: '#AA3939'}}/>
                    </div>
                    <div className="card-title">
                        <div>{this.state.teamName}</div>
                        <div className="team-title">Team</div>
                    </div>
                    <div className="card-content">
                        <div className="card-column">
                            <div className="card-column-container">
                                <Link to={`picks/${this.state.teamID}`} activeClassName="active" activeStyle={{fontWeight: 'bold'}}>View Schedule</Link> 
                                <div className="team-eliminated">
                                    Eliminated
                                </div>
                            </div>
                            <div className="card-column-container"> 
                                <div className="pick-history-title">Pick History</div>
                                <PickHistory userID={this.state.uid} teamID={this.state.teamID}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
	}
};

function GetCurrentPick(props) {
    return (
        <div className="pick-container">
            <div className="pick-logo-container">
                <div className="pick-logo-title">
                    Current Pick:
                </div>
                <img src={props.pickURL} height="80" width="80"/>
            </div>
            <div>
                <Link to={`picks/${props.teamID}`} className="link" activeClassName="active"  activeStyle={{fontWeight: 'bold'}}>Change</Link>
            </div>
        </div>
    )
}

export default Redux.connect()(DisplayTeam);