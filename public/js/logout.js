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


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}