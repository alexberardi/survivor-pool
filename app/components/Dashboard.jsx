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
		this.state = {userID: null, displayName: null, isAdmin: false, hasPaid: true, messages: null, week: 0};
	}
	componentWillMount() {
		var {dispatch} = this.props;
		var {uid, displayName} = dispatch(actions.getUserAuthInfo());
		dispatch(actions.refreshToken());

		const userInfo = Requests.get(`/users/${uid}`).then((user) => {
			return [user.data.user_id, user.data.full_name, user.data.is_admin];
		})
		
		const teamInfo = Requests.get(`/teams/${uid}`).then((teams) => {
			if(teams.data !== null) {
				return teams.data.every(team => team.has_paid);
			}
		})

		const messageInfo = Requests.get('/messages/active/').then((messages) => {
            if(messages.data) {
                return messages.data;
            }
		})

		const weekInfo = Requests.get('/games/week/current').then((week) => {
			let currentWeek = parseInt(week.data);
			dispatch(actions.setWeek(currentWeek));
			return parseInt(week.data);
		})

		Promise.all([userInfo, teamInfo, messageInfo, weekInfo])
		.then((values) => 
		this.setState({
			userID: values[0][0],
			displayName: values[0][1],
			isAdmin: values[0][2],
			hasPaid: values[1],
			messages: values[2],
			week: values[3]
		}))
		.catch((error) => console.log(error));
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
							<TeamInfo week={this.state.week}/>
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