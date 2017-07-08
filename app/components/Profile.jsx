import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';


export var Profile = React.createClass({
	onLogout(e) {
		e.preventDefault();
		var {dispatch} = this.props;

		dispatch(actions.startLogout());
	},
	render: function() {
		var {dispatch} = this.props;
		var user = dispatch(actions.getUserInfo());

		return (
			<div className="profile-container">
				<img className="profile-image"  src={user.photoURL} />
				<button type="button" className="primary-button" onClick={this.onLogout}>Logout</button>
			</div>
		)
	}
});

export default Redux.connect()(Profile);