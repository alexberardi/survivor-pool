import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';
import {Link, IndexLink, hashHistory} from 'react-router';

import Nav from 'Nav';
import Footer from 'Footer';
import UserTeam from 'UserTeam';
import UserTeamSearch from 'UserTeamSearch';

class Admin extends Component {
	constructor(props) {
        super(props);
        this.state = {isAdmin: false, userTeams: null, filteredTeams: null};
        this.populateGames = this.populateGames.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
	componentWillMount() {
		var {dispatch} = this.props;
		var {uid, displayName} = dispatch(actions.getUserAuthInfo());

		var that = this;
		
		Requests.get(`/users/${uid}`).then(function(user) {
            if(user.data.isAdmin) {
                that.setState({isAdmin: true});
            } else {
                hashHistory.push('/dashboard');
            }
        });
        
        Requests.get('/teams/admin/users').then(function(teams) {
            if(teams.data[0]) {
                that.setState({userTeams:teams.data[0]});
            }
        });
    }
    handleSearch(searchText) {
        let userTeams = this.state.userTeams;
        searchText = searchText.toLowerCase();
        let filteredTeams = userTeams.filter((team) => {
            let teamName = team.teamName.toLowerCase();
            let email = team.email.toLowerCase();
            let fullName = team.fullName.toLowerCase();

            return searchText.length === 0 || 
            teamName.indexOf(searchText) > -1 ||
            email.indexOf(searchText) > -1 ||
            fullName.indexOf(searchText) > -1;
        });

        this.setState({filteredTeams});
    }
    populateGames() {
        Requests.post('/games/populate', {})
            .then(function(res) {
                console.log('Games Populated Successfully.');
            })
            .catch(function(error) {
                console.log('Error populating games', error);
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
					<UserTeam key={userTeam.teamID} {...userTeam}/>
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