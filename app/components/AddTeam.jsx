import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import firebase from 'firebase';
import axios from 'axios';

import FaPlusSquare from 'react-icons/lib/fa/plus-square';

class AddTeam extends Component {
	constructor(props) {
        super(props);
        this.state = {addTeam: false, userID: props.userID};
        this.handleTeamAdd = this.handleTeamAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
		var {dispatch} = this.props;
		var {uid} = dispatch(actions.getUserAuthInfo());
        this.setState({userID: uid});
	}
    handleTeamAdd(e) {
        e.preventDefault();
        this.setState({addTeam: true});
    }
    handleSubmit(e) {
        e.preventDefault();

        const that = this;

        if(this.refs.teamName.value.length > 0) {
            firebase.auth().currentUser.getToken(true).then(function(token) {
                axios.defaults.headers.common['Authorization'] = token;

                let team = {
                    token,
                    user_id: that.state.userID,
                    team_name: that.refs.teamName.value
                }

                axios.post('/teams', team)
                    .then(function(res) {
                        that.props.refreshPlayerTeams();
                        that.setState({addTeam: false});
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            });
        }
    }
	render() {
        var addTeamButton = () => {
            if(this.state.addTeam) {
                return (
                    <form onSubmit={this.handleSubmit}>
                         <div className="change-team-input-container">
                                <input type="text" className="team-input" ref="teamName" maxLength={30} />
                                <button type="submit" className="secondary-button">Create</button>
                            </div>
                    </form>
                )
              
            } else {
                return (
                    <a href="#" className="team-link" onClick={this.handleTeamAdd}>Create<FaPlusSquare size={45} style={{marginLeft: '12px'}} /></a>
                )
            }
        }
		return (
			<div className="card-container">
                <div className="card-title">
                    Create a Team
                </div>
                <div className="card-content">
                    {addTeamButton()}
                </div>
            </div>
		)
	}
};

export default Redux.connect()(AddTeam);