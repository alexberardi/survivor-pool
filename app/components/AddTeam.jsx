import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';

class AddTeam extends Component {
	constructor(props) {
        super(props);
        this.state = {addTeam: false, userID: props.userID};
        this.handleTeamAdd = this.handleTeamAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
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
        let team = {
            userID: this.state.userID,
            teamName: this.refs.teamName.value
        }

        if(team.teamName.length > 0) {
            Requests.post('/teams', team)
            .then(function(res) {
                that.props.refreshPlayerTeams();
                that.setState({addTeam: false});
            })
            .catch(function(error) {
                console.log(error);
            })
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