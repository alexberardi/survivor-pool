(function($, M) {
	"use strict";

	var settings = {
		standingsURL: "/standings/",
		rowTemplate: $("#TableRow"),
		tableAppend: "#standings-table",
	};
	
	
	function init() {
		var standings = getRequest(settings.standingsURL);

		standings = standings[0];
		standings.forEach(function(standing) {
			var standingsInfo = {
				streak: standing.total,
				teamname: standing.teamname,
				playername: standing.first + ' ' + standing.last
			};


			$(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), standingsInfo));
		});

	}
	
	init();

}(jQuery, Mustache));