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

				date: game.gameDate,
				hometeam: game.homeTeamName,
				hometeamscore: game.homeScore,
				awayteam: game.awayTeamName,
				awayteamscore: game.awayScore
			};
			console.log(gameInfo.hometeamscore);
			$(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), gameInfo));
		});
	}
	
	init();

}(jQuery, Mustache));