import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import axios from 'axios';

class ChangeTeam extends Component {
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
                that.props.teamSubmit(teamName);
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    }
	render() {
		return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="change-team-input-container">
                        <input type="text" className="team-input" ref="teamName" maxLength={25} defaultValue={this.props.teamName}/>
                        <button type="submit" className="secondary-button">Change</button>
                    </div>
                </form>
            </div>
		)
	}
};

export default Redux.connect()(ChangeTeam);