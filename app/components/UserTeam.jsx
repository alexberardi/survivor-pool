import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as Requests from 'Requests';
import FaEdit from 'react-icons/lib/fa/edit';
import FaCheck from 'react-icons/lib/fa/check';
import FaDollar from'react-icons/lib/fa/dollar';
import FaClose from 'react-icons/lib/fa/close';


import ChangeTeam from 'ChangeTeam';

class UserTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {isActive: props.is_active, teamID: props.team_id, hasPaid: props.has_paid, teamName: props.team_name, changeTeam: false};
        this.toggleActive = this.toggleActive.bind(this);
        this.togglePaid = this.togglePaid.bind(this);
        this.teamSubmit = this.teamSubmit.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
    }
    toggleActive(e) {
        e.preventDefault();
        const that = this;
        let active = !this.state.isActive;
        let team_id = this.state.teamID;

        Requests.put(`/teams/active/${team_id}`, {active, team_id})
            .then(function(res) {
                that.setState({isActive: res.data.is_active});
            })
            .catch(function(error) {
                console.log(error);
        })

    }
    togglePaid(e) {
        e.preventDefault();
        const that = this;
        let paid = !this.state.hasPaid;
        let team_id = this.state.teamID;

        Requests.put(`/teams/paid/${team_id}`, {paid, team_id})
            .then(function(res) {
                that.setState({hasPaid: res.data.has_paid});
            })
            .catch(function(error) {
                console.log(error);
        })

    }
    teamSubmit(teamName) {
        this.setState({teamName, changeTeam: false});
    }
    handleTeamChange(e) {
        e.preventDefault();
        this.setState({changeTeam: true});
    }
	render() {
        let isActive = this.state.isActive;
        let activeIndicator = null;
        let isPaid = this.state.hasPaid;
        let paidIndicator = null;
        let teamButton = null;

        if(isActive) {
            activeIndicator = <a href="#" onClick={this.toggleActive}> <FaCheck size={25} style={{color: '#00ad61'}}/> </a>
        } else {
            activeIndicator = <a href="#" onClick={this.toggleActive}> <FaClose size={25} style={{color: '#AA3939'}}/> </a>
        }

        if(isPaid) {
            paidIndicator = <a href="#" onClick={this.togglePaid}> <FaDollar size={25} style={{color: '#00ad61'}}/> </a>
        } else {
            paidIndicator = <a href="#" onClick={this.togglePaid}> <FaDollar size={25} style={{color: '#AA3939'}}/> </a>
        }

        if(this.state.changeTeam) {
            teamButton = <ChangeTeam teamID={this.state.teamID} userID={this.state.uid} teamSubmit={this.teamSubmit} teamName={this.state.teamName} admin={true}/>
        } else {
            teamButton = <a href="#" className="team-link" onClick={this.handleTeamChange}>{this.state.teamName}<FaEdit size={25} style={{marginLeft: '12px'}} /></a>
        }

		return (
            <div className="card-row">
				<div className="userteam-card">
                    <div className="userteam-card-title">
                        {teamButton}
                        <div className="userteam-card-title-icons">
                            {activeIndicator}
                            {paidIndicator}
                        </div>
                    </div>
                    <div className="userteam-card-content">
                        <div className="userteam-card-item">{this.props.full_name}</div>
                        <div className="userteam-card-item">{this.props.email}</div>
                    </div>
                </div>
			</div>
        )
    }
};

export default Redux.connect()(UserTeam);