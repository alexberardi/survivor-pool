import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';
import {Link, IndexLink, hashHistory} from 'react-router';

import Nav from 'Nav';
import Footer from 'Footer';

class Admin extends Component {
	constructor(props) {
        super(props);
        this.state = {isAdmin: false};
        this.populateGames = this.populateGames.bind(this);
    }
	componentDidMount() {
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