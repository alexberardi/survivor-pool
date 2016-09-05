$(function () {
	$('#login-form').on('valid submit', function (e) {
		e.preventDefault();
		var user = {
			"email": $("#login-email").val(),
			"password": $("#login-pass").val()
		}

		$.ajax({
		type: "POST",
		url: '/users/login',
		contentType : 'application/json',
		data: JSON.stringify(user),
		async: false
		})
		.done(function(data, textStatus, request){
			document.cookie = 'Auth='+ request.getResponseHeader('Auth');
			document.cookie = 'userID=' + data.id;
			document.cookie = 'email=' + data.email;
			document.cookie = 'teamName=' + data.teamName;
			$('#login-pass').val('');
			$('#login-email').val('');
			window.location.href = "/standings.html";
		})
		.fail(function(data, textStatus, request){
			var errorMsg = '<div class="alert callout" data-closable><h5>Invalid Login</h5><button class="close-button" aria-label="Dismiss alert" type="button" data-close><span aria-hidden="true">&times;</span></button></div>'
			$("#sticky-menu").append(errorMsg);
			$('#login-pass').val('');
			$('#login-email').val('');
		});
	})
});