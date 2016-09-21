var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var app = express();
var db = require('./db.js');
var middleware = require('./middleware.js')(db);
var request = require('request');

var ctrlUsers = require('./api/controllers/users.controller');
var ctrlGames = require('./api/controllers/games.controller');
var ctrlNFLTeams = require('./api/controllers/nflTeams.controller');
var ctrlUserPicks = require('./api/controllers/userPicks.controller');
var ctrlUserStreaks = require('./api/controllers/userStreaks.controller');

var PORT = process.env.PORT || 3000;

var env = process.env.NODE_ENV || 'development';

var keys = {}
if (env === 'production') {
	keys = {
		encrypt: process.env.EKEY,
		decrypt: process.env.DKEY
	};
} else {
	keys = {
		encrypt: 'abcdef',
		decrypt: 'abcdef'
	}
}


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


//USERS REQUESTS
app.get('/users',  middleware.requireAuthentication, function(req, res) {
	ctrlUsers.usersGetAll(req, res);
});

app.get('/users/count', middleware.requireAuthentication, function(req, res) {
	ctrlUsers.userGetCountAll(req, res);
});

app.post('/users', function(req, res) {
	ctrlUsers.userCreate(req, res);
});

app.post('/users/login', function(req, res){
	ctrlUsers.userLogin(req, res);
});

app.put('/users/teamName/:userid', middleware.requireAuthentication, function(req, res){
	ctrlUsers.updateTeamName(req, res);
});

app.put('/users/password/:userid', middleware.requireAuthentication,  function(req, res){
	ctrlUsers.updatePassword(req, res);
});

app.put('/users/email/:userid', middleware.requireAuthentication, function(req, res){
	ctrlUsers.updateEmail(req, res);
});

//GAMES REQUESTS
app.get('/games/populate', function(req, res) {
	ctrlGames.populateGames(req, res);
});

app.get ('/games/user/:userid',  middleware.requireAuthentication, function(req, res){
	ctrlGames.getWeeklyGames(req, res);
});

app.get ('/games/started',  middleware.requireAuthentication, function(req, res){
	ctrlGames.getStartedGames(req, res);
});

app.get('/games/week/current', middleware.requireAuthentication, function(req, res){
	ctrlGames.getCurrentWeek(req, res);
});


app.put('/games/liveUpdate/:gameid', middleware.requireAuthentication, function(req, res){
	ctrlGames.updateGames(req, res);
});


//TEAMS REQUESTS
app.get('teams/populate', function(req, res){
	ctrlNFLTeams();
});

//PICKS REQUESTS
app.get('/picks/user/:userid', middleware.requireAuthentication,  function(req, res){
	ctrlUserPicks.getPicks(req, res);
});

app.get('/picks/current/:userid', middleware.requireAuthentication,  function(req, res){
	ctrlUserPicks.getCurrentPicks(req, res);
});

app.get('/picks/popular', middleware.requireAuthentication, function(req, res){
	ctrlUserPicks.getPopularPicks(req, res);
});

app.post('/picks/:userid',  middleware.requireAuthentication, function(req, res){
	ctrlUserPicks.makePick(req, res);
});

app.get('/picks/admins', middleware.requireAuthentication, function(req,res){
	ctrlUserPicks.getAdminPicks(req,res);
});

//STREAK REQUESTS
app.get('/streak/active/:userid', middleware.requireAuthentication,  function(res, req){
	ctrlUserStreaks.checkActive(res, req);
});

app.get('/streak/count/active', middleware.requireAuthentication, function(res, req){
	ctrlUserStreaks.getCountActive(res, req);
});

app.post('/streak', function (req, res) {
	ctrlUserStreaks.updateStreak();
});



//STANDINGS REQUESTS
app.get('/standings', middleware.requireAuthentication,  function (req, res) {
	ctrlUserStreaks.getStandings(req, res);
});


//DELETE Token- logout
// DELETE users/login
app.delete('/users/login', middleware.requireAuthentication, function(req, res){
	req.token.destroy()
	.then(function(){
		res.status(204).send();
	}).
	catch(function(e){
		res.status(500).send();
	});
});



db.sequelize.sync()
	.then(
		app.listen(PORT, function() {
			console.log('express listening on port ' + PORT + '!');
		})
	);


