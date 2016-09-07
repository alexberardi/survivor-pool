$(function () {
	$('#changeemail-button').on('click', function() {
		$("#email-change").submit();
	});

	$('#email-change').on('valid submit', function (e) {
		e.preventDefault();

		var userID = getCookie('userid');
		var Auth = getCookie('Auth');
		
		var email = {
			"email": $('#email').val()
		}	

		$.ajax({
		type: "PUT",
		url: 'users/email/' + userID,
		headers: {
                    'Auth': Auth
                },
		contentType : 'application/json',
		data: JSON.stringify(email),
		async: false
		})
		.done(function(data, textStatus, request){
			var successMsg = "<div class='success callout' data-closable='slide-out-right'><p>You've changed your Email.</p><button class='close-button' aria-label='Dismiss alert' type='button' data-close><span aria-hidden='true'>&times;</span></button></div>"
			$("#successEmail").append(successMsg);
			$("#email").val('');
			$("#verifyemail").val('');
		})
		.fail(function(data, textStatus, request){
			var successMsg = "<div class='alert callout' data-closable='slide-out-right'><p>Uh Oh, something went wrong.</p><button class='close-button' aria-label='Dismiss alert' type='button' data-close><span aria-hidden='true'>&times;</span></button></div>"
			$("#successEmail").append(successMsg);
		});
	})
});