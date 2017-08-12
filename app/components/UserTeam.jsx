import React, {Component} from 'react';
import * as Redux from 'react-redux';
import FaCheck from 'react-icons/lib/fa/check';
import FaDollar from'react-icons/lib/fa/dollar';
import FaClose from 'react-icons/lib/fa/close';

class UserTeam extends Component {
    constructor(props) {
		super(props);
    }
	render() {
        let isActive = this.props.isActive;
        let activeIndicator = null;
        let isPaid = this.props.hasPaid;
        let paidIndicator = null;

        if(isActive) {
            activeIndicator = <FaCheck size={25} style={{color: 'green'}} />
        } else {
            activeIndicator = <FaClose size={25} style={{color: 'red'}} />
        }

        if(isPaid) {
            paidIndicator = <FaDollar size={25} style={{color: 'green'}} />
        } else {
            paidIndicator = <FaDollar size={25} style={{color: 'red'}} />
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