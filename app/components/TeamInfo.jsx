import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Users from 'Users';


export var TeamInfo = React.createClass({
	render: function() {

		var {dispatch} = this.props;
		var {uid} = dispatch(actions.getUserAuthInfo());
		
		Users.getUser(uid).then(function(user) {
			console.log(user.data);
		});

		return (
			<div className="">
			</div>
		)
	}
});

export default Redux.connect()(TeamInfo);