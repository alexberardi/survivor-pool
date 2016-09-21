$(function () {

	function getCurrentAdminPicks() {
		var currentWeek = getRequest('/games/week/current');

		var data = {
			"week": currentWeek
		};

		var adminPicks = getRequestWithData('/picks/admins', data);
		picks = adminPicks[0];

		if(picks.length < 1)
			$("#Alex-pick").text("Admins haven't picked yet");
		
		picks.forEach(function(pick) {
			var currPick = {
				name: '',
				id: pick['id'],
				team: pick['teamname']
			};

			if (currPick.id == 5) {
				currPick.name = 'Jimmy';
				$("#Jimmy-pick").text("Jimmy chose the " + currPick.team);
			}
			if (currPick.id == 1){
				currPick.name = 'Alex';
				$("#Alex-pick").text("Alex chose the " + currPick.team);
			} 
		});

	}


	getCurrentAdminPicks();

});