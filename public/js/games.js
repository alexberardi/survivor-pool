(function($, M) {
	"use strict";

	var settings = {
		gamesurl: "/api/games",
		rowTemplate: $("#TableRow"),
		tableAppend: "#schedule",
	};
	
	function getRequest(address) {
		var request = null;
		
		$.ajax({
			type: "GET",
			url: address,
			async: false
		})
		.done(function(data) {
			request = data;
		});

		return request;
	}
	
	function init() {
		var games = getRequest(settings.gamesurl);
		games.forEach(function(game) {
			var gameInfo = {
				date: game.gameDate.substring(4, 6) + "/" + game.gameDate.substring(6,8) + "/" + game.gameDate.substring(0,4),
				hometeam: game.homeTeamName,
				hometeamscore: game.homeScore,
				hometeamLogo: 'images/' + game.homeTeamName.toLowerCase() + '.gif',
				awayteam: game.awayTeamName,
				awayteamscore: game.awayScore,
				awayteamLogo: 'images/' + game.awayTeamName.toLowerCase() + '.gif',
				week: game.week,
				gameid: game.gameID
			};


			$(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), gameInfo));
		});
	}
	
	init();

}(jQuery, Mustache));