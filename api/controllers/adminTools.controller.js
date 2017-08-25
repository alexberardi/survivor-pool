var _ = require('underscore');
var db = require('../../db');

var advanceWeek = function(req, res) {
	var week = parseInt(req.params.week, 10);
	getGamesForWeek(week).then(function(games){
		var winnersLosersObject = buildWinnersLosersArrays(games);
		deactivateLosers(week, winnersLosersObject.losers).then(function(losers){
			advanceWinners(week, winnersLosersObject.winners).then(function(winners) {
				res.status(200).send();
			});
		});
	});
};

function advanceWinners(week, winners) {
	return new Promise(function(resolve, reject) {
		db.teamPicks.findAll({
			where: {
				team_name: {$in : winners},
				week: week
			}
		})
		.then(function(advancingTeams){
			var advancingTeamsArray = [];
			advancingTeams.forEach(function(advancingTeam){
				advancingTeamsArray.push(advancingTeam.team_id);
			});

			db.teamStreaks.update(
			{
				total: week
			},
			{
				where: {
					team_id: {$in: advancingTeamsArray}
				}
			})
			.then(function(winningTeamStreams){
				resolve(winningTeamStreams);
				})
			})		
	});
}

function buildWinnersLosersArrays(games) {
	var losers = [];
	var winners = [];

	games.forEach(function(game){
			if( parseInt(game.home_score, 10) === parseInt(game.away_score, 10) ) { //if there is a tie, both teams lose
				losers.push(game.away_team_name);
				losers.push(game.home_team_name);
			} else {
				var loser = parseInt(game.home_score, 10) > parseInt(game.away_score, 10) ? game.away_team_name : game.home_team_name;
				var winner = parseInt(game.home_score, 10) > parseInt(game.away_score, 10) ? game.home_team_name : game.away_team_name;
				losers.push(loser);
				winners.push(winner);
			}
		});

		return {winners: winners, losers: losers};
}

function deactivateLosers(week, losers) {
	return new Promise(function(resolve, reject){
		
		db.teamPicks.findAll({
			where: {
				team_name: {$in : losers},
				week: week
			}
		})
		.then(function(losersToDeactivate){
			var losersArray = [];			
			losersToDeactivate.forEach(function(loserToDeactivate){
				losersArray.push(loserToDeactivate.team_id);
			});

			db.playerTeams.update(
				{ is_active: false},
				{
					where: {
						team_id: {$in:losersArray}
					}
				}
			)
			.then(function(losers){
				resolve(losers);
			})
		})




		
	})
}

function getGamesForWeek(week){
	var ctrlGames = require('./games.controller');

	return new Promise(function(resolve, reject) {
		db.games.findAll({
			where: {
				week: week,
				quarter: 'F'
			}
		})
		.then(function(games) {
			resolve(games);
			return games;
		})
	});
}

module.exports = {
	advanceWeek: advanceWeek
};