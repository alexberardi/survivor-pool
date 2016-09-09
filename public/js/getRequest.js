function getRequest(address) {
		var request = null;

		var auth = {
			"cookie": getCookie('Auth')
		};


		$.ajax({
			type: "GET",
			url: address,
			headers: {
				'Auth': auth.cookie
			},
			async: false
		})
		.done(function(data) {
			request = data;
		});

		return request;
}

function getRequestNoAuth(address) {
    var request = null;

    $.ajax({
        type: "GET",
        url: address,
        async: false
    })
        .done(function(data) {
            request = data;
        });

    return request;
}