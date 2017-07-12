import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import axios from 'axios';

class CreateTeam extends Component {
	constructor(props) {
        super(props);
        this.state = {userID: props.userID};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        let userID = this.state.userID;
        let that = this;

        if(userID === null) {
            var {dispatch} = this.props;
            var {uid} = dispatch(actions.getUserAuthInfo());
            userID = uid;
        }

        let teamName = this.refs.teamName.value;
        
        if(teamName.length > 0) {
            axios.put(`/users/teamName/${userID}`, {
                teamName
            }).then(function(res) {
                that.props.refreshTeam(teamName);
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    }
	render() {
		return (
			<div className="create-team-container">
                <div className="card-title">
                    Looks like you need a team name!
                </div>
                <form onSubmit={this.handleSubmit} id="createTeamForm">
                    <div className="create-team-input-container">
                        <input type="text" className="team-input" ref="teamName" placeholder="Enter Team Name"/>
                        <button type="submit" className="secondary-button">Create</button>
                    </div>
                </form>
            </div>
		)
	}
};

export default Redux.connect()(CreateTeam);