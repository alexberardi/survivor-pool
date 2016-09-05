(function($, M) {
	"use strict";

	var settings = {
		gamesurl: "/games/user/" + getCookie('userID'),
		rowTemplate: $("#TableRow"),
		tableAppend: "#schedule",
	};
	
	function getRequest(address) {
		var request = null;

		$.ajax({
			type: "GET",
			url: address,
			headers: {
				'Auth': getCookie('Auth')
			},
			async: false
		})
			.done(function(data) {
				request = data;
			});

		return request;
	}
	
	function init() {
	//	updateScores();
	//	var games = getRequest(settings.gamesurl);
	//	var previousPicks = getRequest('/picks/user/' + getCookie('userID'));
	//	var currentPick = getRequest('/picks/current/' + getCookie('userID'));
	//	var gamesStarted = getRequest(('/games/started'));

		games.forEach(function(game) {
			var gameInfo = {
				date: game.gameDate.substring(4, 6) + "/" + game.gameDate.substring(6,8) + "/" + game.gameDate.substring(0,4),
				hometeam: game.homeTeamName,
				hometeamstyle: 'unused',
				hometeamscore: game.homeScore,
				hometeamLogo: 'images/' + game.homeTeamName.toLowerCase() + '.gif',
				awayteam: game.awayTeamName,
				awayteamstyle: 'unused',
				awayteamscore: game.awayScore,
				awayteamLogo: 'images/' + game.awayTeamName.toLowerCase() + '.gif',
				week: game.week,
				gameid: game.gameID,
				quarter: game.quarter,
				inprogress: ''
			};


			if (!jQuery.isEmptyObject(previousPicks)) {
				previousPicks.forEach(function (pick) {
					if (game.homeTeamName === pick.teamName) {
						gameInfo.hometeamstyle = 'used';
					}
					if (game.awayTeamName === pick.teamName) {
						gameInfo.awayteamstyle = 'used';
					}

				});
			}

			if (!jQuery.isEmptyObject(currentPick)){
				if (currentPick[0].teamName === game.homeTeamName) {
					gameInfo.hometeamstyle = 'current';
				} else if (currentPick[0].teamName === game.awayTeamName) {
					gameInfo.awayteamstyle = 'current';
				}
			}

			if (!jQuery.isEmptyObject(gamesStarted)) {
				gamesStarted.forEach(function (inProgress) {
					if (inProgress.homeTeamName === game.homeTeamName) {
						gameInfo.hometeamstyle = gameInfo.hometeamstyle + ' inProgress';
						gameInfo.awayteamstyle = gameInfo.awayteamstyle  + ' inProgress';
						gameInfo.inprogress = 'inProgress';
					}

				});
			}

			checkActive(gameInfo);

			$(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), gameInfo));
		});

		if (!jQuery.isEmptyObject(currentPick)){
			var currentPickHTML = "<div class='current-pick-info'>You've picked " + currentPick[0].teamName + ", Good luck!</div>"
			$("#schedule-top").append(currentPickHTML);
		}

	}
	
	init();

}(jQuery, Mustache));

function checkActive(gameInfo){
	$.ajax({
		type: "GET",
		url: '/streak/active/' + getCookie('userID'),
		headers: {
			'Auth': getCookie('Auth')
		},
		async: false
	})
		.fail(function(data) {
			gameInfo.hometeamstyle = ' inProgress';
			gameInfo.awayteamstyle = ' inProgress';
			gameInfo.inprogress = 'inProgress';
		});
}