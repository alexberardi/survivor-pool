$(function () {

	var teamName = '';
	var gameID = 0;
	var week = 0;

	$('.pick').click(function() {
		teamName = $(this).data("team-name");
		gameID = $(this).data("game-id");
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
        	"userid": 1,
        	"teamid": teamName,
        	"gameid": gameID
        };

		$.ajax({
                type: "POST",
                data: pick,
                url: 'api/pick',
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