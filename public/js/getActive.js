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
	var inactiveUsers = totalUsers[0]['count'] - activeUsers[0]['count'];
	console.log(totalUsers[0]['count']);
	console.log(activeUsers[0]['count']);
	console.log(inactiveUsers);

	var data = {
		labels: [
			"Swimming",
			"Sunk"
		],
		datasets: [{
			data: [activeUsers[0]['count'], inactiveUsers],
			backgroundColor: [
				"#362C6A",
				"#9A151F"
			]
		}]

	};

	createActiveChart(data);
});