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
		var {photoURL} = dispatch(actions.getUserAuthInfo());

		return (
			<div className="profile-container">
				<img className="profile-image"  src={photoURL} />
				<button type="button" className="primary-button" onClick={this.onLogout}>Logout</button>
			</div>
		)
	}
};

export default Redux.connect()(Profile);