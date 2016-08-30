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

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


//USERS REQUESTS
app.get('/users',  middleware.requireAuthentication, function(req, res) {
	ctrlUsers.usersGetAll(req, res);
});

app.post('/users', function(req, res) {
	ctrlUsers.userCreate(req, res);
});

app.post('/users/login', function(req, res){
	ctrlUsers.userLogin(req, res);
});

//GAMES REQUESTS
app.get('/games/populate', function(req, res) {
	ctrlGames.populateGames(req, res);
});

app.get ('/games',  middleware.requireAuthentication, function(req, res){
	ctrlGames.getWeeklyGames(req, res);
});

//TEAMS REQUESTS
app.get('teams/populate', function(req, res){
	ctrlNFLTeams();
});

//PICKS REQUESTS
app.post('/picks',  middleware.requireAuthentication, function(req, res){
	ctrlUserPicks.makePick(req, res);
});


//STREAK REQUESTS
app.post('/streak', function (req, res) {
	ctrlUserStreaks.updateStreak();
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

