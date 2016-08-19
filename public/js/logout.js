$(function () {
    $('#logout-button').click(function (e) {
        e.preventDefault();
        var user = {
            "cookie": getCookie('Auth')
        }        

        $.ajax({
                type: "DELETE",
                url: 'users/login',
                contentType : 'application/json',
                data: JSON.stringify(user),
                async: false
                })
                .done(function(data, textStatus, request){

                    var loginmenu = '<ul class="menu" id="login"><li><input type="email" id="login-email" placeholder="Email"></li><li><input type="password" id="login-pass" placeholder="Password"></li><li><button type="button" class="button" id="login-button">Login</butto</li></ul>';

                    $("#logout").remove();
                    $("#userentry").append(loginmenu);
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