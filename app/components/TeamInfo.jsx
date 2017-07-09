import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Users from 'Users';


class TeamInfo extends Component {
	constructor(props) {
		super(props);
	}
	render() {

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
};

export default Redux.connect()(TeamInfo);