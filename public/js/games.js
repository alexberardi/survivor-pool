(function($, M) {
	"use strict";

	var settings = {
		gamesurl: "/games",
		rowTemplate: $("#TableRow"),
		tableAppend: "#schedule",
	};
	
	function getRequest(cURL) {
		var oReturn = null;
		
		$.ajax({
			type: "GET",
			url: cURL,
			async: false
		})
		.done(function(oData) {
			oReturn = oData;
		});

		return oReturn;
	}
	
	function init() {
		var games = getRequest(settings.gamesurl);
		games.forEach(function(game) {
			var gameInfo = {
				date: game.gameDate.substring(4, 6) + "/" + game.gameDate.substring(6,8) + "/" + game.gameDate.substring(0,4),
				hometeam: game.homeTeamName,
				hometeamscore: game.homeScore,
				hometeamLogo: 'teamLogos/' + game.homeTeamName + '.gif',
				awayteam: game.awayTeamName,
				awayteamscore: game.awayScore,
				awayteamLogo: 'teamLogos/' + game.awayTeamName + '.gif'
			};


			$(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), gameInfo));
		});
	}
	
	init();

}(jQuery, Mustache));