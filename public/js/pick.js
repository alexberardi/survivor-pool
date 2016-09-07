$(function () {

	var teamName = '';
	var gameID = 0;
	var week = 0;

	$('#pickHistory').click(function(){
		window.location.href = "/pickHistory.html";
	});

	$('.pick').click(function() {
		teamName = $(this).data("team-name");
		gameID = $(this).data("gameid");
		week = $(this).data("week");
		$("#team-name").text(teamName);
	});

	$('#cancel-pick').click(function() {
		$("#pick-modal").foundation('close');
	});

	$('#confirm-pick').click(function() {
		var auth = {
            "cookie": getCookie('Auth')
        };

        var pick = {
        	"week": week,
        	"teamname": teamName,
        	"gameid": gameID
        };

        pick = JSON.stringify(pick);



		if (checkActive()){
			$.ajax({
				type: "POST",
				data: pick,
				url: '/picks/' + getCookie('userid'),
				contentType: 'application/json',
				headers: {
					'Auth': auth.cookie
				},
				async: false
			})
				.done(function(data, textStatus, request){
					$("#pick-modal").foundation('close');
					location.reload();
				})

				.fail(function(data, textStatus, request){
					console.log(data, textStatus, request);
					if (data.status === 401) {
						alert("You cannot select the same team twice.");
					}
				});
		} else {
			alert('Your streak is no longer active. Better luck next season.');
			location.reload();
		}



	});
});


function checkActive(){
	var returnValue = false;
	$.ajax({
		type: "GET",
		url: '/streak/active/' + getCookie('userid'),
		headers: {
			'Auth': getCookie('Auth')
		},
		async: false
	})
		.success(function(data){
			returnValue = true;
		})
		.fail(function(data) {
			returnValue = false;
		});
	return returnValue;
}