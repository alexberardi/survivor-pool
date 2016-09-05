(function($, M) {
    "use strict";


    $("#backToSchedule").click(function(){
        window.location.href = "/home.html";
    });

    var settings = {
        userPicksURL: "/picks/user/" + getCookie('userID'),
        rowTemplate: $("#TableRow"),
        tableAppend: "#pick-history-table",
    };

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

    function init() {
        var userPicks = getRequest(settings.userPicksURL);

        if (!jQuery.isEmptyObject(userPicks)) {
            userPicks.forEach(function (pick) {
                var pickHistoryInfo = {
                    week: pick.week,
                    teamName: pick.teamName,
                    logo: 'images/' + pick.teamName.toLowerCase() + '.gif',
                };

                $(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), pickHistoryInfo));
            });
        }
    }

    init();

}(jQuery, Mustache));