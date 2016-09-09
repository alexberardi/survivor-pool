(function($, M) {
	"use strict";

	var settings = {
		standingsURL: "/standings/",
		rowTemplate: $("#TableRow"),
		tableAppend: "#standings-table",
	};
	
	
	function createChart(data) {
		var chartCanvas = $("#bar-chart");
		var standingsChart = new Chart(chartCanvas, {
			type: 'horizontalBar',
			data: data,
			options: {
				legend: {
					display: false
				},
				tooltips: {
					backgroundColor: 'rgba(54, 44, 106, 1)'
				},
				scales: {
					xAxes: [{
						ticks: {
							beginAtZero: true,
						}
					}],
					yAxes: [{
						categoryPercentage: .5,
						gridLines : {
							drawTicks: false,
						}
					}]

				}
			}
		});
	}
	
	function init() {
		var standings = getRequest(settings.standingsURL);
		var barPlayers = [];
		var barData = [];
		var barColors = [];
		var borderColors = [];
		
		standings = standings[0];
		standings.forEach(function(standing) {
			var standingsInfo = {
				streak: standing.total,
				teamname: standing.teamname,
				playername: standing.first + ' ' + standing.last
			};

			barPlayers.push(standingsInfo.teamname + " ( " + standingsInfo.playername + " ) ");
			barData.push(standingsInfo.streak);
			barColors.push(randomColor({hue: 'purple', luminosity: 'dark', format: 'rgba'}));
			borderColors.push(randomColor({hue: 'purple', format: 'rgba'}));

			$(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), standingsInfo));
		});

		var data = {
			labels: barPlayers,
			datasets: [{
				label: "Correct Picks",
				data: barData,
				backgroundColor: barColors,
				borderColor: borderColors,
				borderWidth: 3,
				hoverBorderColor: 'rgba(54, 44, 106, 1)',

			}]
		};
		createChart(data);
	}
	
	init();

}(jQuery, Mustache));