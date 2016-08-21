$(function () {
	$('#login-form').on('valid submit', function (e) {
		var user = {
			"email": $("#login-email").val(),
			"password": $("#login-pass").val()
		}

		$.ajax({
		type: "POST",
		url: 'users/login',
		contentType : 'application/json',
		data: JSON.stringify(user),
		async: false
		})
		.done(function(data, textStatus, request){
			document.cookie = "Auth="+ request.getResponseHeader('Auth');
			$('login-pass').val('');
			$('login-email').val('');
		});
	})
});