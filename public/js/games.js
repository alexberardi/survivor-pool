(function($, M) {
	"use strict";

	var settings = {
		gamesurl: "/games/user/" + getCookie('userid'),
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
		updateScores();
		var games = getRequest(settings.gamesurl);
		var previousPicks = getRequest('/picks/user/' + getCookie('userid'));
		var currentPick = getRequest('/picks/current/' + getCookie('userid'));
		var gamesStarted = getRequest(('/games/started'));

		games.forEach(function(game) {
			var gameInfo = {
				date: game.gamedate.substring(4, 6) + "/" + game.gamedate.substring(6,8) + "/" + game.gamedate.substring(0,4),
				hometeam: game.hometeamname,
				hometeamstyle: 'unused',
				hometeamscore: game.homescore,
				hometeamLogo: 'images/' + game.hometeamname.toLowerCase() + '.gif',
				awayteam: game.awayteamname,
				awayteamstyle: 'unused',
				awayteamscore: game.awayscore,
				awayteamLogo: 'images/' + game.awayteamname.toLowerCase() + '.gif',
				week: game.week,
				gameid: game.gameid,
				quarter: game.quarter,
				inprogress: ''
			};


			if (!jQuery.isEmptyObject(previousPicks)) {
				previousPicks.forEach(function (pick) {
					if (game.hometeamname === pick.teamname) {
						gameInfo.hometeamstyle = 'used';
					}
					if (game.awayteamname === pick.teamname) {
						gameInfo.awayteamstyle = 'used';
					}

				});
			}

			if (!jQuery.isEmptyObject(currentPick)){
				if (currentPick[0].teamname === game.hometeamname) {
					gameInfo.hometeamstyle = 'current';
				} else if (currentPick[0].teamname === game.awayteamname) {
					gameInfo.awayteamstyle = 'current';
				}
				if (currentPick[0].quarter != 'P') {
					gameInfo.hometeamstyle = 'inProgress';
					gameInfo.awayteamstyle = 'inProgress';
					gameInfo.inProgress = 'inProgress';
				}
			}

			if (!jQuery.isEmptyObject(gamesStarted)) {
				gamesStarted.forEach(function (inProgress) {
					if (inProgress.hometeamname === game.hometeamname) {
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
			var currentPickHTML = "<div class='current-pick-info'>You've picked " + currentPick[0].teamname + ", Good luck!</div>"
			$("#schedule-top").append(currentPickHTML);
		}

	}

	init();

}(jQuery, Mustache));

function checkActive(gameInfo){
	$.ajax({
		type: "GET",
		url: '/streak/active/' + getCookie('userid'),
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