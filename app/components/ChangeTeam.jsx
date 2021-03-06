import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import firebase from 'firebase';
import axios from 'axios';

class ChangeTeam extends Component {
	constructor(props) {
        super(props);
        this.state = {userID: props.userID, teamID: props.teamID, admin: props.admin};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        let teamID = this.state.teamID;
        let userID = this.state.userID;
        const that = this;
        let url = this.state.admin ? `/teams/name/${teamID}` : `/teams/${teamID}`;

        let teamName = this.refs.teamName.value;

        if(teamName.length > 0) {
            firebase.auth().currentUser.getToken(true).then(function(token) {
                axios.defaults.headers.common['Authorization'] = token;
                axios.put(url, {token, user_id: userID, team_name: teamName})
                    .then(function(res) {
                        that.props.teamSubmit(teamName);
                    })
                    .catch(function(error) {
                        console.log(error);
                });
            });
        } 
    }
	render() {
		return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="change-team-input-container">
                        <input type="text" className="team-input" ref="teamName" maxLength={45} defaultValue={this.props.teamName}/>
                        <button type="submit" className="secondary-button">Change</button>
                    </div>
                </form>
            </div>
		)
	}
};

export default Redux.connect()(ChangeTeam);