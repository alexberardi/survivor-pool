$(function () {
	$('#changeteam-button').on('click', function() {
		$("#teamname-change").submit();
	});
	$('#teamname-change').on('valid submit', function (e) {
		e.preventDefault();

		var userID = getCookie('userID');

		var teamName = {
			"teamName": $("#teamName").val()
		}		
          

		$.ajax({
		type: "PUT",
		url: 'users/teamName/' + userID,
		contentType : 'application/json',
		data: JSON.stringify(teamName),
		async: false
		})
		.done(function(data, textStatus, request){
			alert('this worked');
		})
		.fail(function(data, textStatus, request){
			alert('this failed');
		});
	})
});