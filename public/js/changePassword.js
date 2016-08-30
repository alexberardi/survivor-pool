$(function () {
	Foundation.Abide.defaults.patterns['password'] = /^(.){7,}$/;
	$('#changepass-button').on('click', function() {
		$("#password-change").submit();
	});

	$('#password-change').on('valid submit', function (e) {
		e.preventDefault();

		var userID = getCookie('userID');
		
		var password = {
			"password": $('#password').val()
		}	

		$.ajax({
		type: "PUT",
		url: 'users/password/' + userID,
		contentType : 'application/json',
		data: JSON.stringify(password),
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