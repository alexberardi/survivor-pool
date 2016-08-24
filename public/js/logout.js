$(function () {
    $('#logout-button').click(function (e) {

        var user = {
            "cookie": getCookie('Auth')
        }        

        $.ajax({
                type: "DELETE",
                url: 'users/login',
                contentType: 'application/json',
                headers: {
                    'Auth': user.cookie
                },
                async: false
                })
                .done(function(data, textStatus, request){
                    window.location.href = "/index.html";
                })

                .fail(function(data, textStatus, request){
                    console.log(data, textStatus, request);
                });
    });
});