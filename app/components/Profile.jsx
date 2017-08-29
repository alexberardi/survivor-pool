import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.onLogout  = this.onLogout.bind(this);
	}
	onLogout(e) {
		e.preventDefault();
		this.props.dispatch(actions.startLogout());
	}
	render() {
		var {dispatch} = this.props;
		var {displayName, photoURL} = dispatch(actions.getUserAuthInfo());

		return (
			<div className="profile-container">
				<img className="profile-image" src={photoURL} />
				<div>
					<div className="profile-name-container">
						Hey, {displayName} !
					</div>
					<div>
						<a href="#" className="logout-link" onClick={this.onLogout}>Logout</a>
					</div>
				</div>
			</div>
		)
	}
};

export default Redux.connect()(Profile);