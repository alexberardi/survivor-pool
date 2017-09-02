import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';
import {Link, IndexLink, hashHistory} from 'react-router';

import Nav from 'Nav';
import Footer from 'Footer';
import UserTeam from 'UserTeam';
import UserTeamSearch from 'UserTeamSearch';
import MessageList from 'MessageList';

class Admin extends Component {
	constructor(props) {
        super(props);
        this.state = {isAdmin: false, userTeams: null, filteredTeams: null, userID: null, week: 0};
        this.populateGames = this.populateGames.bind(this);
        this.advanceWeek = this.advanceWeek.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
	componentDidMount() {
		var {dispatch} = this.props;
        var {uid, displayName} = dispatch(actions.getUserAuthInfo());
        const week = dispatch(actions.getWeek());

		const that = this;
		
		const userInfo = Requests.get(`/users/${uid}`).then((user) => {
            if(user.data.is_admin) {
                return true;
            } else {
                hashHistory.push('/dashboard');
            }
        });
        
        const teamInfo = Requests.get('/teams/admin/users').then((teams) => {
            if(teams.data[0]) {
                return teams.data[0];
            }
        });

        Promise.all([userInfo, teamInfo])
        .then((values) => 
        that.setState({
            userID: uid,
            week: week,
            isAdmin: values[0],
            userTeams: values[1],
        }))
        .catch((error) => console.log(error))
    }
    handleSearch(searchText) {
        let userTeams = this.state.userTeams;
        searchText = searchText.toLowerCase();
        let filteredTeams = userTeams.filter((team) => {
            let teamName = team.team_name.toLowerCase();
            let email = team.email.toLowerCase();
            let fullName = team.full_name.toLowerCase();

            return searchText.length === 0 || 
                teamName.indexOf(searchText) > -1 ||
                email.indexOf(searchText) > -1 ||
                fullName.indexOf(searchText) > -1;
        });

        this.setState({filteredTeams});
    }
    populateGames() {
        Requests.post('/games/populate', {})
            .then((res) => {
                console.log('Games Populated Successfully.');
            })
            .catch((error) => {
                console.log('Error populating games', error);
            })
    }
    advanceWeek() {
        Requests.put(`/admin/advanceWeek/${this.state.week}`, {})
        .then((response) => {
            console.log('Week advanced successfully', response);
        })
        .catch((error) => {
            console.log('Error advancing week', error);
        })
    }
	render() {
        let userTeams;
        if(this.state.filteredTeams !== null) {
            userTeams = this.state.filteredTeams;
        } else {
            userTeams = this.state.userTeams;
        }

        var renderUserTeams = () =>  {
            if(userTeams === null || userTeams.length == 0) {
				return (
					 <div className="card-row">
						<div className="card">
							<div className="card-title">
								 None found.
							</div>
						</div>
					</div>
				)
            }

            return userTeams.map((userTeam) => {
				return (
					<UserTeam key={userTeam.team_id} {...userTeam}/>
				)
            })
        }

        if(this.state.isAdmin) {
            return (
                <div className="dashboard">
                    <Nav page={'Admin'} />
                    <div className="row">
                        <div className="column small-centered small-11 medium-10 large-9">
                            <div className="dashboard-title">Admin Dashboard</div>
                            <div className="container">
                                <div className="card-row">
                                    <div className="card">
                                        <div className="card-title">
                                            Games Tools
                                        </div>
                                        <div className="card-content">
                                            <div className="admin-button-container">
			                                    <button type="button" className="dashboard-nav-button" onClick={this.populateGames}>Populate Games</button>
		                                    </div>
                                            <div className="admin-button-container">
                                                <button type="button" className="dashboard-nav-button" onClick={this.advanceWeek}>Advance Week</button>
                                            </div>
                                         </div>
                                    </div>
                                </div>
                                <div className="card-row">
                                    <div className="userteams-container">
                                        <div className="userteams-container-title">
                                            User Teams
                                            <UserTeamSearch handleSearch={this.handleSearch}/>
                                        </div>
                                        {renderUserTeams()}
                                    </div>
                                </div>
                                <div className="card-row">
                                    <MessageList userID={this.state.userID}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Footer />
                    </div>
                </div>
		    )
        } else {
            return (
                <div className="dashboard">
                    <Nav page={'Admin'} />
                    <div className="row">
                        <div className="column small-centered small-11 medium-10 large-9">
                            <div className="dashboard-title">Wrong Place!</div>
                        </div>
                    </div>
                    <div className="row">
                        <Footer />
                    </div>
                </div>
            )
        }

	}
};

export default Redux.connect()(Admin);