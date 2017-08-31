import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';

import Nav from 'Nav';
import UserTeamSearch from 'UserTeamSearch';
import User from 'User';
import Footer from 'Footer';

class Standings extends Component {
	constructor(props) {
        super(props);
        this.state = {users: null, filteredUsers: null};
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentWillMount() {
        const that = this;

        Requests.get('/standings').then(function(response) {
            that.setState({users: response.data});
        });
    }
    handleShowTeam(e) {
        e.preventDefault();
    }
    handleSearch(searchText) {
        let users = this.state.users;
        searchText = searchText.toLowerCase();
        let filteredUsers = users.filter((user) => {
            let teams = user.teams;
            let fullName = user.full_name.toLowerCase();

            return searchText.length === 0 || 
                teams.some((team) => {
                    return team.player_team_name.indexOf(searchText) > -1
                 }) ||
                fullName.indexOf(searchText) > -1;
        });
        this.setState({filteredUsers});
    }
	render() {
        let users;
        if(this.state.filteredUsers !== null) {
            users = this.state.filteredUsers;
        } else {
            users = this.state.users;
        }

        const renderUsers = () => {
            if(users === null || users.length === 0) {
                return (
                    <div className="card-row">
                       <div className="userteam-card">
                           <div className="userteam-card-title">
                                None found.
                           </div>
                       </div>
                   </div>
               )
            }

            return users.map((user, index) => {
                return <User key={index} picture_url={user.picture_url} full_name={user.full_name} {...user}/>
            }); 
        }

        return (
            <div className="dashboard">
                <Nav page={'Standings'} />
                <div className="row">
                    <div className="column small-centered small-11 medium-10 large-9">
                        <div className="dashboard-title">Standings</div>
                        <div className="container">
                            <div className="card-row">
                                <div className="userteams-container">
                                    <div className="userteams-container-title">
                                        Players
                                        <UserTeamSearch handleSearch={this.handleSearch}/>
                                    </div>
                                    {renderUsers()}
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
    }
};


export default Redux.connect()(Standings);