(function($, M) {
    "use strict";


    $("#backToSchedule").click(function(){
        window.location.href = "/schedule.html";
    });

    var settings = {
        userPicksURL: "/picks/user/" + getCookie('userid'),
        rowTemplate: $("#TableRow"),
        tableAppend: "#pick-history-table",
    };

    function init() {
        var userPicks = getRequest(settings.userPicksURL);

        if (!jQuery.isEmptyObject(userPicks)) {
            userPicks.forEach(function (pick) {
                var pickHistoryInfo = {
                    week: pick.week,
                    teamName: pick.teamname,
                    logo: 'images/' + pick.teamname.toLowerCase() + '.gif',
                };

                $(settings.tableAppend).append(M.to_html($(settings.rowTemplate).html(), pickHistoryInfo));
            });
        }
    }

    init();

}(jQuery, Mustache));