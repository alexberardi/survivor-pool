import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

import * as Requests from 'Requests';
import TeamInfo from 'TeamInfo';
import Nav from 'Nav';
import Footer from 'Footer';
import FaExclamation from 'react-icons/lib/fa/exclamation';
import FaBullhorn from 'react-icons/lib/fa/bullhorn';
import FaCheckCircle from 'react-icons/lib/fa/check-circle'; 

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {userID: null, displayName: null, isAdmin: false, hasPaid: true, messages: null};
	}
	componentWillMount() {
		var {dispatch} = this.props;
		var {uid, displayName} = dispatch(actions.getUserAuthInfo());

		const that = this;
		var displayName;
		var isAdmin = this.state.isAdmin;
		var hasPaid = this.state.hasPaid;

		Requests.get(`/users/${uid}`).then(function(user) {
			displayName = user.data.full_name;
			isAdmin = user.data.is_admin;
			that.setState({userID: uid, displayName, isAdmin});
		});
		Requests.get(`/teams/${uid}`).then(function(teams) {
			if(teams.data !== null) {
				let playerTeams = teams.data;
				hasPaid = playerTeams.every(team => team.has_paid);
			}
			that.setState({hasPaid});
		});

		Requests.get('/messages/active/').then(function(messages) {
            if(messages.data) {
                that.setState({messages: messages.data});
            }
        }); 
	}
	render() {
		let isAdmin = this.state.isAdmin;
		let hasPaid = this.state.hasPaid;
		let messages = this.state.messages;

		let paymentIndicator;
		let adminPage;

		var renderMessages = () => {
            if(messages === null || messages.length === 0) {
                return 
            }

            return messages.map((message) => {
                return <RenderMessage key={message.message_id} text={message.message_text} payment={false} type={message.message_type}/>
            });

		}
		
		if(!hasPaid) {
			paymentIndicator = <RenderMessage text={"You haven't paid entry for the season."} payment={true} />
		}

		return (
			<div className="dashboard">
				<Nav admin={isAdmin} page={'Dashboard'}/>
				<div className="row">
					<div className="column small-centered small-11 medium-10 large-9">
						<div className="dashboard-title">Dashboard</div>
						{paymentIndicator}
						{renderMessages()}
						<div className="container">
							<TeamInfo />
						</div>
					</div>
				</div>
				<div className="row">
					<Footer />
				</div>
			</div>
		)
	}
};

function RenderMessage(props) {
	let icon = null;
	let type;

	if(props.payment) {
		type = "message-urgent";
		icon = <FaExclamation width={40} height={40} style={{marginLeft: '12px', marginRight: '12px'}} /> 
	} else {
		switch(props.type) {
			case 'U':
				type = "message-urgent";
				icon = <FaExclamation width={40} height={40} style={{marginLeft: '12px', marginRight: '12px'}} /> 
				break;
			case 'N':
				type = "message-normal";
				icon = <FaBullhorn width={40} height={40} style={{marginLeft: '12px', marginRight: '12px'}} /> 
				break;
			case 'G':
				type = "message-good";
				icon =<FaCheckCircle width={40} height={40} style={{marginLeft: '12px', marginRight: '12px'}} /> 
				break;
			default:
				type="message-normal";
				break;				
		}
	}

	return (
		<div className={type}>
			{icon}
			<div className="message-text">{props.text}</div>
		</div>
	)
}

export default Redux.connect()(Dashboard);