function getRequest(address) {
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

function putRequest(game) {
    var request = null;
    var address = '/games/liveUpdate/' + game.gsis;

    var body = {
        "homeScore": game.hs,
        "awayScore": game.vs,
        "quarter": game.q
    };


    body = JSON.stringify(body);

    $.ajax({
        type: "PUT",
        url: address,
        contentType : 'application/json',
        headers: {
            'Auth': getCookie('Auth')
        },
        data: body,
        async: false
    })
        .done(function(data) {

        });

    return request;
}


function updateScores(){
    var games = getRequest('http://www.nfl.com/liveupdate/scorestrip/ss.json');

    games.gms.forEach(function(game){
       putRequest(game);
    });

}