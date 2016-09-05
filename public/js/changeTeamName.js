$(function () {
	$('#changeteam-button').on('click', function() {
		if ($("#teamName").val()) 
			$("#teamname-change").submit();
	});
	$('#teamname-change').on('valid submit', function (e) {
		e.preventDefault();

		var userID = getCookie('userid');
		var Auth = getCookie('Auth');

		var teamName = {
			"teamname": $("#teamName").val()
		}		
          
		$.ajax({
		type: "PUT",
		url: 'users/teamName/' + userID,
		headers: {
                    'Auth': Auth
                },
		contentType : 'application/json',
		data: JSON.stringify(teamName),
		async: false
		})
		.done(function(data, textStatus, request){
			var successMsg = "<div class='success callout' data-closable='slide-out-right'><p>You've changed your Team Name.</p><button class='close-button' aria-label='Dismiss alert' type='button' data-close><span aria-hidden='true'>&times;</span></button></div>"
			$("#successTeam").append(successMsg);
		})
		.fail(function(data, textStatus, request){
			var successMsg = "<div class='alert callout' data-closable='slide-out-right'><p>Uh Oh, something went wrong.</p><button class='close-button' aria-label='Dismiss alert' type='button' data-close><span aria-hidden='true'>&times;</span></button></div>"
			$("#successTeam").append(successMsg);
		});
	})
});