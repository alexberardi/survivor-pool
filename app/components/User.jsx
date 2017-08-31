import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as Requests from 'Requests';

import FaCheck from 'react-icons/lib/fa/check';
import FaClose from 'react-icons/lib/fa/close';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, showTeams: false};
        this.toggleShowTeams = this.toggleShowTeams.bind(this);
    }
    toggleShowTeams(e) {
        e.preventDefault();
        this.setState({showTeams: !this.state.showTeams});
    }
	render() {
        const that = this;
        const teams = this.state.teams;
        let activeIndicator; 
        let image;
        let activeUser = teams.some((team) => {
            return (team.is_active === 1 || team.is_active);
        }); 

        if(this.props.picture_url.length > 0) {
            image = <img className="profile-image" src={this.props.picture_url} />
        }

        if(activeUser) {
            activeIndicator = <FaCheck size={25} style={{color: '#00ad61'}}/>
        } else {
            activeIndicator = <FaClose size={25} style={{color: '#AA3939'}}/>
        }

        if(this.state.showTeams) {

            const renderUserTeams = () => {
                return teams.map((team, index) => {
                    return <RenderTeam key={index} {...team}/>
                });
            }

            return (
                <div className="card-row">
                    <div className="user-card">
                        <div className="userteam-card-title">
                            <div>
                                {image}
                            </div>
                            <div className="userteam-card-item">{this.props.full_name}</div>
                            <div className="userteam-card-title-icons">
                                <div className="userteam-card-item">{activeIndicator}</div>
                                <div className="userteam-card-item"><a href="#" className="toggle-teams-link" onClick={this.toggleShowTeams}>Hide Teams</a></div>
                            </div>
                        </div>
                        <div className="teams-container">
                            {renderUserTeams()}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="card-row">
                    <div className="user-card">
                        <div className="userteam-card-title">
                            <div>
                                {image}
                            </div>
                            <div className="userteam-card-item">{this.props.full_name}</div>
                            <div className="userteam-card-title-icons">
                                <div className="userteam-card-item">{activeIndicator}</div>
                                <div className="userteam-card-item"><a href="#" className="toggle-teams-link" onClick={this.toggleShowTeams}>Show Teams</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
};

function RenderTeam(props) {
    let activeIndicator = null;
    let currentPick = props.currentpick || '';
    let streak = null;

    if(props.streak_total > 0) {
        streak = <span>Streak: {props.streak_total}</span>
    } else  {
        streak = <span>No streak yet!</span>
    }

    if(props.is_active === 1 || props.is_active) {
        activeIndicator = <FaCheck size={25} style={{color: '#00ad61'}}/>
    } else {
        activeIndicator = <FaClose size={25} style={{color: '#AA3939'}}/>
    }

    if(currentPick.length > 0) {
        let imageURL = `/images/${currentPick.toLowerCase()}.gif`;
        currentPick = <div>Current Pick: <img src={imageURL} height="40" width="40" style={{margin: '6px 6px 6px 6px'}} /></div>
    }

    return (
        <div className="userteam-card-alternate">
            <div className="userteam-card-title">
                {props.player_team_name}
                <div className="userteam-card-title-icons">

                    {activeIndicator}
                </div>
            </div>
            <div className="userteam-card-content"> 
                <div className="userteam-streak">
                    {streak}
                    {currentPick}
                </div>
            </div>
        </div>
    )
}

export default Redux.connect()(User);