$(function () {
	$('#register-button').click(function (e) {
		$('#thrownMsg').remove();
		if (validateForm()) {
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
					$('input[name=first]').val('');
					$('input[name=last]').val(''); 
					$('input[name=email]').val('');
					$('input[name=password]').val('');
					$('input[name=teamName]').val('');
					$('#success').append(successMsg);
				}
			});
			e.preventDefault();
		} 
	});
});


function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateForm () { 
	var thrownMsg = '';

	if ($('input[name=first]').val() == '' )
		thrownMsg += 'Please enter a first name.' + "<br>";

	if ($('input[name=last]').val() == '' )
		thrownMsg += 'Please enter a last name.' + "<br>";

	if ($('input[name=email]').val() == ''){
		thrownMsg += 'Please enter an email.' + "<br>";
	} else { 
		if (!validateEmail($('input[name=email]').val())) {
			thrownMsg += 'Please enter a valid email.' + "<br>";
		}
	}
	if ($('input[name=password]').val() == '' || $('input[name=verifypassword]').val() == '' ) {
		thrownMsg += 'Please enter a password.' + "<br>";
	} else {
		if ($('input[name=password]').val() !== $('input[name=verifypassword]').val()) {
			thrownMsg += 'Your passwords do not match.' + "<br>";
		} else {
			 if ($('input[name=password]').val().length < 7)
			 		thrownMsg += 'Your password must be at least 7 characters.' + "<br>";
		}
	}

	if (thrownMsg.length > 1) {
		var errorMsg = '<div class="alert callout" id="thrownMsg" data-closable><h5>' + thrownMsg + '</h5><button class="close-button" aria-label="Dismiss alert" type="button" data-close><span aria-hidden="true">&times;</span></button></div>';
		$('#success').append(errorMsg);
		return false;
	} else {
		return true;
	}

}

