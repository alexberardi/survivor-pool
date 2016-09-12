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
				"teamname": $('input[name=teamName]').val()
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

/*
      <span class="signup-title">Register</span>
    <div class="row">
    	<div class="large-8 medium-8 columns sign-up">
    		<form data-abide="ajax" id="register-form">
    			<div class="row">
    				<div class="medium-6 columns">
    					<label>First Name
    					  <input type="text" name="first" required>
                <span class="form-error">
                What's your name?
                </span>
              </label>
    				</div>
    				<div class="medium-6 columns">
    					<label>Last Name
    					  <input type="text" name="last" required>
                <span class="form-error">
                ...And your last name?
                </span>
              </label>
    				</div>
    			</div>
    			<div class="row">
    				<div class="large-12 columns">
    					<label>Email
    					  <input type="email" name="email" required><br>
                <span class="form-error">
                We need your email!
                </span>
              </label>
    				</div>
    			</div>
    			<div class="row">
    				<div class="large-12 columns">
    					<label>Password
    					  <input type="password" id="password" name="password" aria-describedby="passwordhelper" pattern="password" required><br>
                <p class="help-text" id="passwordhelper">Password must be at least 7 characters.</p>
                <span class="form-error">
                  Did you forget a password?
                </span>
              </label>
    				</div>
    				<div class="large-12 columns">
    					<label>Verify Password
    					  <input type="password" name="verifypassword" required data-equalto="password"><br><br>
                <span class="form-error">
                  Passwords don't match!
                </span>
              </label>
    				</div>
    				<div class="large-12 columns">
    					<label>Team Name (Optional)
    					  <input type="text" name="teamName" aria-describedby="teamNameHelper" data-abide-ignore><br>
              </label>
    				</div>
    			</div>
    			<div class="row">
    				<div class="large-12 columns">
    					<button type="button" id="register-button" class="purple-button large button">Sign Up</button>
    				</div>
    			</div>
          <div class="row">
            <div class="medium-6 columns sign-up" id="success">
              <div data-abide-error class="alert callout" style="display: none;">
                <p><i class="fi-alert"></i> There are some errors in your registration.</p>
              </div>
            </div>
          </div>
  			</form>
  		</div>
    <div class="reveal" id="register-modal" data-reveal>
      <h2>You're registered!</h2>
      <p>Login and make a pick! Good luck!</p>
      <button class="close-button" data-close aria-label="Close modal" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>

 
*/