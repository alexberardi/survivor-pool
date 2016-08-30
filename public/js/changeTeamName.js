$(function () {
	$('#change-team').on('valid submit', function (e) {
		e.preventDefault();
		

		$.ajax({
		type: "POST",
		url: '',
		contentType : 'application/json',
		data: JSON.stringify(team),
		async: false
		})
		.done(function(data, textStatus, request){
			
		})
		.fail(function(data, textStatus, request){
			
		});
	})
});