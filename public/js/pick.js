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
        	"userId": 1,
        	"teamName": teamName,
        	"gameId": gameID
        };

        pick = JSON.stringify(pick);
		
		$.ajax({
                type: "POST",
                data: pick,
                url: 'api/picks',
                contentType: 'application/json',
                headers: {
                    'Auth': auth.cookie
                },
                async: false
                })
                .done(function(data, textStatus, request){
                    alert("you've made your pick");
                })

                .fail(function(data, textStatus, request){
                    console.log(data, textStatus, request);
                });

	});
});