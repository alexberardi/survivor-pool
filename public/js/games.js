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
		var currentWeek = '';
		var currentPickGameStarted = '';

		if (!jQuery.isEmptyObject(gamesStarted))
		{
			gamesStarted.forEach(function(gameStarted){
				if (!jQuery.isEmptyObject(currentPick)){
					if (gameStarted.hometeamname === currentPick[0].teamname || gameStarted.awayteamname === currentPick[0].teamname){
						currentPickGameStarted  = ' inProgress';
					}
				}


			})
		}


		games.forEach(function(game) {
			var gameInfo = {
				date: game.gamedate.substring(4, 6) + "/" + game.gamedate.substring(6,8) + "/" + game.gamedate.substring(0,4) + " @ " + game.time,
				hometeam: game.hometeamname,
				hometeamstyle: 'unused' + currentPickGameStarted,
				hometeamscore: game.homescore,
				hometeamLogo: 'images/' + game.hometeamname.toLowerCase() + '.gif',
				awayteam: game.awayteamname,
				awayteamstyle: 'unused' + currentPickGameStarted,
				awayteamscore: game.awayscore,
				awayteamLogo: 'images/' + game.awayteamname.toLowerCase() + '.gif',
				week: game.week,
				gameid: game.gameid,
				quarter: game.quarter,
				inprogress: currentPickGameStarted.trim()
			};

			currentWeek = game.week;

			switch(game.quarter) {
				case "P":
					game.quarter = "Pregame";
					break;
				case "H":
					game.quarter = "Half-Time";
					break;
				case "F":
					game.quarter = "Finished";
					break;
				default:
					game.quarter = game.quarter;
			}

			if (!jQuery.isEmptyObject(previousPicks)) {
				previousPicks.forEach(function (pick) {
					if (game.hometeamname === pick.teamname) {
						gameInfo.hometeamstyle = 'used' + currentPickGameStarted;
					}
					if (game.awayteamname === pick.teamname) {
						gameInfo.awayteamstyle = 'used' + currentPickGameStarted;
					}

				});
			}

			if (!jQuery.isEmptyObject(currentPick)){
				if (currentPick[0].teamname === game.hometeamname) {
					gameInfo.hometeamstyle = 'current' + currentPickGameStarted;
				} else if (currentPick[0].teamname === game.awayteamname) {
					gameInfo.awayteamstyle = 'current' + currentPickGameStarted;
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

		$("#current-week").html("Week " + currentWeek);
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

