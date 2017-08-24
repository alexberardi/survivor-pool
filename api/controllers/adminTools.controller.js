var _ = require('underscore');
var db = require('../../db');

var advanceWeek = function(res, req) {
	var week = parseInt(req.params.week, 10);
	getGamesForWeek().then(function(games){
		var winnersLosersObject = buildWinnersLosersArrays(games);
		deactivateLosers(week, winnersLosersObject.losers).then(function(losers){
				advanceWinners(week, winnersLosersObject.winners).then(function(winners) {

				});
			});
	});
};

function advanceWinners(winners) {
	return new Promise(function(resolve, reject) {
		db.teamStreaks.update({
			where: {
				week: 
				team_name: {$in: winners}
			},
			fields: {
				total: total + 1
			}
		})
		.then(function(winningTeamStreams){
			resolve(winningTeamStreams);
		})
	});
}

function buildWinnersLosersArrays(games) {
	var losers = [];
	var winners = [];

	games.forEach(function(game){
			if(parseInt(game.home_team_score, 10) === parseInt(game.away_team_score, 10)) { //if there is a tie, both teams lose
				losers.push(game.away_team_name);
				losers.push(game.home_team_name);
			} else {
				var loser = game.home_team_score > game.away_team_score ? game.away_team_name : game.home_team_name;
				var winner = game.home_team_score > game.away_team_score ? game.home_team_name : game.away_team_name;
				losers.push(loser);
				winners.push(winner);
			}
		});

		return {winners: winners, losers: losers};
}

function deactivateLosers(losers) {
	return new Promise(function(resolve, reject){
		db.playerTeams.update({
				where: {
					week: week,
					team_name: {$in:losers}
				},
				fields: {
					is_active: false
				}
			})
		.then(function(losers){
			resolve(losers);
		})
	})
}

function getGamesForWeek(week){
	var ctrlGames = require('./api/controllers/games.controller');

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