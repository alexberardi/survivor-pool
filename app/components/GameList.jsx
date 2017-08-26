import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';

import Nav from 'Nav';
import Game from 'Game';
import Footer from 'Footer';

class GameList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
			userID: null,
			games: null, 
			startedGames: null, 
			teamID: this.props.params.teamID,
			pickStarted: false,
			pickTemp: null,
			pick: null,
			allPicks: null,
			week: this.props.params.week
		};
		this.startPick = this.startPick.bind(this);
		this.submitPick = this.submitPick.bind(this);
		this.cancelPick = this.cancelPick.bind(this);
		this.formatGameInfo = this.formatGameInfo.bind(this);
		this.refreshPicks = this.refreshPicks.bind(this);
    }
	componentWillMount() {
		var {dispatch} = this.props;
		var {uid, displayName} = dispatch(actions.getUserAuthInfo());

		const that = this;

		Requests.get(`/schedule/${uid}/${this.state.teamID}/${this.state.week}`).then((response) => {
			let games = response.data.games;
			let allPicks = response.data.previousSelections || null;
			let currentPick = response.data.currentSelection || null;
			var disabled = false;
			if(currentPick !== null) {
				disabled = games.some((game) => {
					return (game.has_started && game.game_id === currentPick.game_id)
				});
			}
			that.setState({
				games: response.data.games,
				allPicks: response.data.previousSelections,
				pick: currentPick,
				disabled,
				picked: (currentPick),
				userID: uid
			});
		});
	}
	formatGameInfo(game) {				
		let gameInfo = {
			week: game.week,
			gameID: game.game_id,
			quarter: game.quarter,
			awayImage: `/images/${game.away_team_name.toLowerCase()}.gif`,
			awayTeamName: game.away_team_name,
			homeImage: `/images/${game.home_team_name.toLowerCase()}.gif`,
			homeTeamName: game.home_team_name,
			started: game.has_started,
			homeScore: game.home_score,
			awayScore: game.away_score,
			kickoffTime: game.time,
			kickoffDate: game.game_date.substring(4,6) + "/" + game.game_date.substring(6,8) + "/" + game.game_date.substring(0,4)
		};

		switch(game.quarter) {
			case "P":
				gameInfo.quarterText = "Pregame";
				break;
			case "H":
				gameInfo.quarterText = "Half-Time";
				break;
			case "F":
				gameInfo.quarterText = "Final";
				break;
			case "FO":
				gameInfo.quarterText = "Final / Overtime";
			default:
				gameInfo.quarterText = 'Q' + game.quarter;
		}

		return gameInfo;
	}	
	startPick(pick) {
		if(pick !== null) {
			this.setState({pickStarted: true, pickTemp: pick});
		}
	}
	cancelPick() {
		this.setState({pickStarted: false, pickTemp: null});
		this.refreshPicks();
	}
	submitPick() {
		const that = this;
		this.state.pickTemp.team_name = this.state.pickTemp.team_picked;

        Requests.post(`/picks/${this.state.teamID}`, this.state.pickTemp)
            .then(function(res) {
				that.setState({pickStarted: false, pick: null});
				that.refreshPicks();
            })
            .catch(function(error) {
                console.log('Error picking game', error);
            });
	}
	refreshPicks() {
		const that = this;

		Requests.get(`/picks/${this.state.userID}/${this.state.teamID}`).then(function(pick) {
			if(pick.data[0]) {
				that.setState({picked: true, pick: pick.data[0]});
			}
		});
	}
	render() {
		let allPicks = this.state.allPicks;
		let games = this.state.games;
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
				game.disabledAway = false;
				game.disabledHome = false;

				if(allPicks !== null) {
					allPicks.forEach(function(pick) {
						if(pick.week !== game.week) {
							game.disabledAway = pick.team_name === game.away_team_name ? true : false;
							game.disabledHome = pick.team_name === game.home_team_name ? true : false;
						}
					});
				}
			});

			return games.map((game) => {
				let formattedGame = this.formatGameInfo(game);

				if(this.state.pickTemp !== null) {
					if(formattedGame.gameID == this.state.pickTemp.game_id) {
						formattedGame.pickedGame = true;
						formattedGame.pickedTeam = this.state.pickTemp.team_picked;
					}
				} else if(this.state.pick !== null) {
					if(formattedGame.gameID == this.state.pick.game_id) {
						formattedGame.pickedGame = true;
						formattedGame.pickedTeam = this.state.pick.team_name;
					}
				}

				return (
					<Game 
						key={game.game_id} 
						disabled={this.state.disabled}
						disabledAway={game.disabledAway}
						disabledHome={game.disabledHome}
						teamID={this.state.teamID} 
						userID={this.state.userID} 
						startPick={this.startPick}
						submitPick={this.submitPick}
						cancelPick={this.cancelPick}
						pick={this.state.pick}
						pickTemp={this.state.pickTemp}
						pickStarted={this.state.pickStarted}
						picked={this.state.picked}
					{...formattedGame}/>
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

export default Redux.connect()(GameList);