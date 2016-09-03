$(function () {

	var teamName = '';
	var gameID = 0;
	var week = 0;

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
        	"userId": getCookie('userID'),
        	"teamName": teamName,
        	"gameId": gameID
        };

        pick = JSON.stringify(pick);
		
		$.ajax({
                type: "POST",
                data: pick,
                url: '/picks',
                contentType: 'application/json',
                headers: {
                    'Auth': auth.cookie
                },
                async: false
                })
                .done(function(data, textStatus, request){
                    $("#pick-modal").foundation('close');
                    alert("You've made your pick!")
					location.reload();
                })

                .fail(function(data, textStatus, request){
                    console.log(data, textStatus, request);
					if (data.status === 401) {
						alert("You cannot select the same team twice.");
					}
                });

	});
});