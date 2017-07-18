import React, {Component} from 'react';
import * as Redux from 'react-redux';
import {Link, IndexLink} from 'react-router';
import * as actions from 'actions';
import * as Requests from 'Requests';

class PickInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {hasPick: false, userID: null};
	}
	componentDidMount() {
		var {dispatch} = this.props;
		var {uid, displayName} = dispatch(actions.getUserAuthInfo());
		this.setState({userID: uid});

		// check for Pick
	}
	render() {
		let hasPick = this.state.hasPick;
		let pickDisplay;

		if(!hasPick) {
			pickDisplay = <Link to="/picks" activeClassName="active"  activeStyle={{fontWeight: 'bold'}}>Make a Pick</Link>
		} else {
			// display pick
			pickDisplay = '';
		}
		return (
			<div className="card">
				<div className="card-container">
					<div className="card-title">
						Current Week's Pick
					</div>
					<div className="card-content">
						{pickDisplay}
					</div>
				</div>
			</div>
		)
	}
};

export default Redux.connect()(PickInfo);