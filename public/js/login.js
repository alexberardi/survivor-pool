$(function () {
	$('#login-button').click(function (e) {
		var user = {
			"email": $("#login-email").val(),
			"password": $("#login-pass").val()
		}

		if(user.email.length > 0 && user.password.length > 0){
			$.ajax({
			type: "POST",
			url: 'users/login',
			contentType : 'application/json',
			data: JSON.stringify(user),
			async: false
			})
			.done(function(data, textStatus, request){
				document.cookie = "Auth="+ request.getResponseHeader('Auth');

				$("#login").hide();
				$("#logout").show();

			});
		} else if (user.email.length === 0 && user.email.password === 0) {
			alert("Email and password are required");
		} else if (user.email.length === 0) {
			alert("Email is required.");
		} else {
			alert("Password is required");
		}
	});
});