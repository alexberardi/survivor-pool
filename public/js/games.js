(function($, M) {
	"use strict";

	var settings = {
		gamesurl: "/games/" + getCookie('userID'),
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
		var games = getRequest(settings.gamesurl);
		var previousPicks = getRequest('/picks/' + getCookie('userID'));
		var currentPick = getRequest('/picks/current/' + getCookie('userID'));

		games.forEach(function(game) {
			var gameInfo = {
				date: game.gameDate.substring(4, 6) + "/" + game.gameDate.substring(6,8) + "/" + game.gameDate.substring(0,4),
				hometeam: game.homeTeamName,
				hometeamscore: game.homeScore,
				hometeamstyle: 'unused',
				hometeamLogo: 'images/' + game.homeTeamName.toLowerCase() + '.gif',
				awayteam: game.awayTeamName,
				awayteamscore: game.awayScore,
				awayteamstyle: 'unused',
				awayteamLogo: 'images/' + game.awayTeamName.toLowerCase() + '.gif',
				week: game.week,
				gameid: game.gameID
			};


			previousPicks.forEach(function(pick) {
				if (game.homeTeamName === pick.teamName) {
					gameInfo.hometeamstyle = 'used';
				}
				if (game.awayTeamName === pick.teamName) {
					gameInfo.awayteamstyle = 'used';
				}

			});

			if (!jQuery.isEmptyObject(currentPick)){
				if (currentPick[0].teamName === game.homeTeamName) {
					gameInfo.hometeamstyle = 'current';
				} else if (currentPick[0].teamName === game.awayTeamName) {
					gameInfo.awayteamstyle = 'current';
				}
			}


			$(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), gameInfo));
		});
	}
	
	init();

}(jQuery, Mustache));