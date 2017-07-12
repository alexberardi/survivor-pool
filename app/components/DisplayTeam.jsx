import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

class DisplayTeam extends Component {
	constructor(props) {
        super(props);
        this.state = {displayName: props.displayName, teamName: props.teamName};
    }
	render() {
		return (
			<div>
                <div className="card-title">
                    Your Team
                </div>
                <div className="card-content">
                    {this.state.teamName}
                </div>
            </div>
		)
	}
};

export default Redux.connect()(DisplayTeam);