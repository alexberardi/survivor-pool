


(function($, M) {
	"use strict";

	var settings = {
		gamesurl: "/games",
		rowTemplate: "<tr><td>{{date}}</td><td>{{hometeam}}</td><td>{{homescore}}</td><td>{{awayteam}}</td><td>{{awayscore}}</td></tr>",
		//rowTemplate: "#TableRow",
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
			var game = {
				date: game.gameDate,
				hometeam: game.homeTeamName,
				hometeamscore: game.homeScore,
				awayteam: game.awayTeamName,
				awayteamscore: game.awayScore
			};

			$(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), game));
		});
	}
	
	init();

}(jQuery, Mustache));