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

	function createChart(data) {
		var chartCanvas = $("#bar-chart");
		var standingsChart = new Chart(chartCanvas, {
			type: 'horizontalBar',
			data: data
		});
	}
	
	function init() {
		var standings = getRequest(settings.standingsURL);
		var barPlayers = [];
		var barData = [];
		
		standings = standings[0];
		standings.forEach(function(standing) {
			var standingsInfo = {
				streak: standing.total,
				teamname: standing.teamname,
				playername: standing.first + ' ' + standing.last
			};

			barPlayers.push(standings.playername + " (" +standings.teamName + ")");
			barData.push(standings.streak);

			$(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), standingsInfo));
		});

		var data = {
			labels: barPlayers,
			datasets: [{
				label: "Standings",
				fillcolor: "#133453",
				strokeColor: "#133454",
				data: barData
			}]
		};
		createChart(data);
	}
	
	init();

}(jQuery, Mustache));