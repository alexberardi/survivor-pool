(function($, M) {
	"use strict";

	var settings = {
		standingsURL: "/standings/",
		rowTemplate: $("#TableRow"),
		tableAppend: "#standings-table",
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
		var standings = getRequest(settings.standingsURL);
		//need to change this for name / teamname
		standings.forEach(function(standing) {
			var standingsInfo = {
				streak: standing.total,
				playername: standing.userId,
				teamname: standing.id
			};

			$(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), standingsInfo));
		});
	}
	
	init();

}(jQuery, Mustache));