import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as Requests from 'Requests';
import FaCheck from 'react-icons/lib/fa/check';
import FaDollar from'react-icons/lib/fa/dollar';
import FaClose from 'react-icons/lib/fa/close';


class UserTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {isActive: props.isActive, teamID: props.teamID, hasPaid: props.hasPaid};
        this.toggleActive = this.toggleActive.bind(this);
        this.togglePaid = this.togglePaid.bind(this);
    }
    toggleActive(e) {
        e.preventDefault();
        let that = this;
        let active = !this.state.isActive;
        let teamID = this.state.teamID;

        Requests.put(`/teams/active/${teamID}`, {active, teamID})
            .then(function(res) {
                that.setState({isActive: res.data.isActive});
            })
            .catch(function(error) {
                console.log(error);
        })

    }
    togglePaid(e) {
        e.preventDefault();
        let that = this;
        let paid = !this.state.hasPaid;
        let teamID = this.state.teamID;

        Requests.put(`/teams/paid/${teamID}`, {paid, teamID})
            .then(function(res) {
                that.setState({hasPaid: res.data.hasPaid});
            })
            .catch(function(error) {
                console.log(error);
        })

    }
	render() {
        let isActive = this.state.isActive;
        let activeIndicator = null;
        let isPaid = this.state.hasPaid;
        let paidIndicator = null;

        if(isActive) {
            activeIndicator = <FaCheck size={25} style={{color: 'green'}} onClick={this.toggleActive}/>
        } else {
            activeIndicator = <FaClose size={25} style={{color: 'red'}} onClick={this.toggleActive}/>
        }

        if(isPaid) {
            paidIndicator = <FaDollar size={25} style={{color: 'green'}} onClick={this.togglePaid}/>
        } else {
            paidIndicator = <FaDollar size={25} style={{color: 'red'}} onClick={this.togglePaid}/>
        }

		return (
            <div className="card-row">
				<div className="userteam-card">
                    <div className="userteam-card-title">
                        {this.props.teamName}
                        <div className="userteam-card-title-icons">
                            {activeIndicator}
                            {paidIndicator}
                        </div>
                    </div>
                    <div className="userteam-card-content">
                        <div className="userteam-card-item">{this.props.fullName}</div>
                        <div className="userteam-card-item">{this.props.email}</div>
                    </div>
                </div>
			</div>
        )
    }
};

export default Redux.connect()(UserTeam);