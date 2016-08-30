$(function () {
	Foundation.Abide.defaults.patterns['password'] = /^(.){7,}$/;
	$('#register-button').on('click', function() {
		$("#register-form").submit();
	});
	$('#register-form').on('valid submit', function (e) {
			e.preventDefault();

			var user = {
			 	"first": $('input[name=first]').val(),
				"last": $('input[name=last]').val(), 
				"email": $('input[name=email]').val(),
				"password": $('input[name=password]').val(),
				"teamName": $('input[name=teamName]').val()   
			};
	
			user = JSON.stringify(user);
	
			$.ajax('/users', {
				data: user,
				contentType: 'application/json',
				type: 'POST',
				success: function() {
					$('input[name=first]').val('');
					$('input[name=last]').val(''); 
					$('input[name=email]').val('');
					$('input[name=password]').val('');
					$('input[name=verifypassword]').val('');
					$('input[name=teamName]').val('');
					$("#register-modal").foundation('open');
				}
			});
	});
});


 
