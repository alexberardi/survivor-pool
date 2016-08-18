var loginBtn = document.getElementById('login-button');

loginBtn.onclick = function() {
	var user = {
		"email": document.getElementsByName('login-email')[0].value,
		"password": document.getElementsByName('login-password')[0].value
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
				alert("successful login");
			});
		} else if (user.email.length === 0 && user.email.password === 0) {
			alert("Email and password are required");
		} else if (user.email.length === 0) {
			alert("Email is required.");
		} else {
			alert("Password is required");
		}

}