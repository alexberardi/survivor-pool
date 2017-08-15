import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';

import Nav from 'Nav';
import Game from 'Game';
import Footer from 'Footer';

class Picks extends Component {
	constructor(props) {
		super(props);
		this.state = {userID: null, games: null, startedGames: null, teamID: this.props.params.teamID, pick: null};
		this.handlePick = this.handlePick.bind(this);
		this.cancelPick = this.cancelPick.bind(this);
    }
	componentWillMount() {
		var {dispatch} = this.props;
		var {uid, displayName} = dispatch(actions.getUserAuthInfo());

		if(this.state.userID == null) {
			this.setState({userID: uid});
		}

		var that = this;

		//Get Games
		Requests.post('/games/update', {}).then(function(response) {
			Requests.get(`/games/user/${uid}`).then(function(games) {
				let currentWeekGames = games.data;
				Requests.get('/games/started').then(function(started) {
					let startedGames = started.data;
					that.setState({games: currentWeekGames, startedGames});
				});
			});
		});

		//Get Picks

	}
	handlePick(pick) {
		this.setState({pick});
	}
	cancelPick() {
		this.setState({pick: null});
	}
	render() {
		let games = this.state.games;
		let started = this.state.startedGames;

		let week = games !== null ? games[0].week : 0;

		var renderGames = () => {
			if(games === null || games.length == 0) {
				return (
					 <div className="pick-card-row">
						<div className="pick-card">
							<div className="pick-card-content">
								 Loading Games...
							</div>
						</div>
					</div>
				)
			}
			games.forEach(function(game) {
				started.forEach(function(start) {
					if(start.gameID == game.gameID) {
						game.started = true;
					}
				});
			});

			return games.map((game) => {
				return (
					<Game key={game.gameID} teamID={this.state.teamID} userID={this.state.userID} currentPick={this.state.pick} handlePick={this.handlePick} cancelPick={this.cancelPick} {...game}/>
				)
			})
		}

		return (
			<div className="dashboard">
				<Nav page={'Picks'} />
				<div className="row">
					<div className="column small-centered small-11 medium-10 large-9">
						<div className="dashboard-title">Week {week}</div>
						<div className="container">
							{renderGames()}
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

export default Redux.connect()(Picks);