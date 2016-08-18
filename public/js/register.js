$(function () {
	$('#register-button').click(function (e) {
		 var user = {
		 	"first": $('input[name=first]').val(),
			"last": $('input[name=last]').val(), 
			"email": $('input[name=email]').val(),
			"password": $('input[name=password]').val(),
			"teamName": $('input[name=teamName]').val()   
		};

		user = JSON.stringify(user);

		var successMsg = '<div class="success callout" data-closable><h5>signed up!</h5><button class="close-button" aria-label="Dismiss alert" type="button" data-close><span aria-hidden="true">&times;</span></button></div>'

		$.ajax('/users', {
			data: user,
			contentType: 'application/json',
			type: 'POST',
			success: function() {
				$('#success').append(successMsg);
			}
		});
		e.preventDefault();	
	});
});