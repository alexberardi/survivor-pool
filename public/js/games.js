


(function($, M) {
	"use strict";

	var settings = {
		gamesurl: "/games",
		rowTemplate: "#TableRow",
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
		console.log(games);
		$(games).each(function() {
			var game = {
				date: $(this).find("gameDate").text(),
				hometeam: $(this).find("homeTeamName").text(),
				hometeamscore: $(this).find("homeScore").text(),
				awayteam: $(this).find("awayTeamName").text(),
				awayteamscore: $(this).find("awayScore").text()
			};

			$(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), game));
		});
	}
	
	init();

}(jQuery, Mustache));