$(function () {

	function createActiveChart(data){
		var chartCanvas = $("#survivorsChart");
		var activeChart = new Chart(chartCanvas, {
			type: 'doughnut',
			animation: {
				animateScale: true,
			},
			data: data,
			options: {
				legend: {
					labels: {
						boxWidth: 20,
						fontSize: 12
					}
				},
				tooltips: {
					backgroundColor: "#133453"
				}
			}
		});
	}

	var activeUsers = getRequest('/streak/count/active');
	var totalUsers = getRequest('/users/count');
	var inactiveUsers = totalUsers[0]["COUNT(*)"] - activeUsers[0]["COUNT(*)"];

	var data = {
		labels: [
			"Swimming",
			"Sunk"
		],
		datasets: [{
			data: [activeUsers[0]["COUNT(*)"], inactiveUsers],
			backgroundColor: [
				"#362C6A",
				"#9A151F"
			]
		}]

	};

	createActiveChart(data);
});