$(function () {
	$('#change-password').on('valid submit', function (e) {
		e.preventDefault();
		

		$.ajax({
		type: "POST",
		url: '',
		contentType : 'application/json',
		data: JSON.stringify(pass),
		async: false
		})
		.done(function(data, textStatus, request){
			
		})
		.fail(function(data, textStatus, request){
			
		});
	})
});