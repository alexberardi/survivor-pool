$(function () {


var teamColorsMap = {
	Cardinals:  "#97233F",
	Falcons: "#A71930",	
	Ravens: "#241773",
	Bills: "#00338D",
	Panthers: "#0085CA",
	Bears: "#0B162A",
	Bengals: "#000000",
	Browns: "#FB4F14",
	Cowboys: "#002244",
	Broncos: "#002244",
	Lions: "#005A8B",
	Packers: "#203731",
	Texans: "#03202F",
	Colts: "#002C5F",
	Jaguars: "#9F792C",
	Chiefs: "#E31837",
	Rams: "#002244",
	Dolphins: "#008E97",
	Vikings: "#4F2683",
	Patriots: "#002244",
	Saints: "#9F8958",
	Giants: "#0B2265",
	Jets: "#203731",
	Raiders: "#A5ACAF",
 	Eagles: "#004953",
 	Steelers: "#FFB612",
	Chargers: "#002244",
	FortyNiners: "#AA0000",
	Seahawks: "#69BE28",
	Buccaneers: "#D50A0A",
	Titans: "#4B92DB",
	Redskins: "#773141"
}

	function createPopularChart(data, chartID, title){
		var chartCanvas = $("#" + chartID);
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
				},
				title: {
				display: true,
				text: title,
				}
			}
		});
	}

	function currentPicksPie(){
		var currentWeek = getRequest('/games/week/current');
		var data = {
			"week": currentWeek
		};
		var currentPicks = getRequestWithData('/picks/popular', data);
		var teamNames = [];
		var teamCount = [];
		var teamColors = [];

		picks = currentPicks[0];
		picks.forEach(function(pick) {
			var popularPicks = {
				count: pick['count(teamname)'],
				teamname: pick['teamname']
			};

			teamNames.push(popularPicks.teamname);
			teamCount.push(popularPicks.count);

			var team = popularPicks.teamname;

			if (team == "49ers") {
				teamColors.push(teamColorsMap.FortyNiners);
			} else {				
				teamColors.push(teamColorsMap[team]);
			}
			
		});

		var data = {
				labels: teamNames,
				datasets: [{
					data: teamCount,
					backgroundColor: teamColors
				}]
			};
		
		createPopularChart(data, "popularCurrent", "Popular teams this week");
	}

	function lastWeekPicksPie(){
		var currentWeek = getRequest('/games/week/current');
		if (currentWeek == 1){
			week = currentWeek;
		} else {
			week = currentWeek - 1;
		}

		var data = {
			"week": week
		};

		var lastPicks = getRequestWithData('/picks/popular', data);
		var teamNames = [];
		var teamCount = [];
		var teamColors = [];

		picks = lastPicks[0];
		picks.forEach(function(pick) {
			var popularPicks = {
				count: pick['count(teamname)'],
				teamname: pick['teamname']
			};

			teamNames.push(popularPicks.teamname);
			teamCount.push(popularPicks.count);

			var team = popularPicks.teamname;

			if (team == "49ers") {
				teamColors.push(teamColorsMap.FortyNiners);
			} else {				
				teamColors.push(teamColorsMap[team]);
			}
		});

		var data = {
				labels: teamNames,
				datasets: [{
					data: teamCount,
					backgroundColor: teamColors
				}]
			};
		
		createPopularChart(data, "popularLast", "Popular teams last week");
	}

	lastWeekPicksPie();
	currentPicksPie();
});