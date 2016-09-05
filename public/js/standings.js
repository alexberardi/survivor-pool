(function($, M) {
	"use strict";

	var settings = {
		standingsURL: "/standings/",
		rowTemplate: $("#TableRow"),
		tableAppend: "#standings-table",
	};
	
	function getRequest(address) {
		var request = null;

		var auth = {
			"cookie": getCookie('Auth')
		};


		$.ajax({
			type: "GET",
			url: address,
			headers: {
				'Auth': auth.cookie
			},
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