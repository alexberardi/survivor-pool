import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

import * as Requests from 'Requests';
import TeamInfo from 'TeamInfo';
import Nav from 'Nav';
import Footer from 'Footer';
import FaExclamation from 'react-icons/lib/fa/exclamation';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {userID: null, displayName: null, isAdmin: false, hasPaid: false};
	}
	componentDidMount() {
		var {dispatch} = this.props;
		var {uid, displayName} = dispatch(actions.getUserAuthInfo());

		var that = this;
		
		Requests.get(`/users/${uid}`).then(function(user) {
			that.setState({userID: uid, displayName, isAdmin: user.data.isAdmin, hasPaid: user.data.hasPaid});
		});
	}
	render() {
		let isAdmin = this.state.isAdmin;
		let hasPaid = this.state.hasPaid;
		let adminPage;
		let message;

		if(isAdmin) {
		}

		if(!hasPaid) {
			message = <div className="message"><FaExclamation size={40} style={{marginLeft: '12px', marginRight: '12px'}} /> <div className="message-text">You haven't paid entry for the season.</div></div>;
		}

		return (
			<div className="dashboard">
				<Nav page={'Dashboard'}/>
				<div className="row">
					<div className="column small-centered small-11 medium-10 large-9">
						<div className="dashboard-title">Dashboard</div>
						{message}
						<div className="container">
							<TeamInfo />
							<div className="card-row">
								<div className="card">
									<div className="card-title">
										This is another card
									</div>
									<div className="card-content">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate quam et vestibulum luctus. Sed quis lorem ultricies, suscipit lacus ac, ornare quam. Praesent at neque ac lacus bibendum feugiat. Integer ac sem lacus. Donec elementum egestas mauris dictum aliquet. Fusce et tortor mollis, ultrices dui quis, consequat ex. Etiam ac arcu cursus lectus vehicula accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi ut rhoncus purus. Phasellus quis ultrices nulla.
										Fusce sodales elit a nulla lobortis pretium. Ut euismod orci eget eros viverra, sodales luctus enim interdum. Vivamus consectetur vitae turpis at viverra. Mauris sed aliquam mi. Morbi elementum, ex ullamcorper maximus iaculis, nisi diam interdum nisi, eu suscipit nibh massa vitae nisi. Aenean volutpat consectetur mi, in convallis ante sagittis id. Duis in turpis quis lectus imperdiet molestie. Aliquam nec urna at nulla tempor faucibus. Maecenas tristique, dui eget auctor ornare, turpis mauris efficitur magna, eu aliquam sem turpis eu lectus. Duis eu ultrices arcu. Aenean ultrices eleifend pretium. Suspendisse potenti. Phasellus eu justo a turpis commodo porta ut et velit.

Integer a justo mollis nibh hendrerit porttitor vel nec justo. Pellentesque placerat enim nisi, eu suscipit lectus viverra sed. Aliquam at sapien cursus libero tincidunt vehicula sit amet eu tellus. Nam nec convallis sem. Praesent mauris elit, iaculis dapibus interdum sit amet, facilisis nec neque. Quisque at diam ac eros egestas luctus. Phasellus eget ex luctus, volutpat massa hendrerit, laoreet tellus. Aliquam cursus magna quis tellus volutpat, eget tempor nulla condimentum. Maecenas lacinia in orci ut ornare. Fusce viverra lorem ac ex dapibus, a dapibus nisi consequat. Cras pharetra ligula eu condimentum auctor. Nam non bibendum lacus. Sed in justo finibus, ultricies ante at, molestie elit. In et viverra enim. Nullam interdum lacus malesuada nisi cursus facilisis. Donec consequat rhoncus lectus in volutpat.
									</div>
								</div>
							</div>
							<div className="card-row">
								<div className="card">
									<div className="card-title">
										This is another card
									</div>
									<div className="card-content">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate quam et vestibulum luctus. 
									</div>
								</div>
								<div className="card">
									<div className="card-title">
										This is another card
									</div>
									<div className="card-content">
										This is some card content.
									</div>
								</div>
							</div>
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

export default Redux.connect()(Dashboard);