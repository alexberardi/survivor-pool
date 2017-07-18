//Basic Packages
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';


//Database
var db = require('./db.js');


//Entities
var ctrlGames = require('./api/controllers/games.controller');
var ctrlNFLTeams = require('./api/controllers/nflTeams.controller');
var ctrlToken = require('./api/controllers/tokens.js');
var ctrlUsers = require('./api/controllers/users.controller');
var ctrlUserStreaks = require('./api/controllers/userStreaks.controller');

//Middleware
var middleware = require('./middleware/common.middleware.js');

app.use(bodyParser.json());


//Games Requests
app.post('/games/populate', middleware.checkAdmin, function(req, res) {
	ctrlGames.populateGames(req, res);
});

app.get ('/games/user/:userid', middleware.checkAuthentication, function(req, res){
	ctrlGames.getWeeklyGames(req, res);
});

app.get ('/games/started', middleware.checkAuthentication, function(req, res){
	ctrlGames.getStartedGames(req, res);
});

app.get('/games/week/current', middleware.checkAuthentication, function(req, res){
	ctrlGames.getCurrentWeek(req, res);
});


//Populate teams
app.get('/teams/populate', middleware.checkAuthentication, function(req, res){
	ctrlNFLTeams();
});


//USERS REQUESTS
app.get('/users', middleware.checkAuthentication, function(req, res) {
	ctrlUsers.usersGetAll(req, res);
});

app.get('/users/count', middleware.checkAuthentication, function(req, res) {
	ctrlUsers.userGetCountAll(req, res);
});

app.get('/users/:userID', middleware.checkAuthentication, function(req, res) {	
 	ctrlUsers.userGet(req, res);		
});

app.get('/users/exists/:userID', function(req, res) {
	ctrlUsers.userCheck(req, res);
});

app.post('/users', function(req, res) {
 	ctrlUsers.userCreate(req, res);
});

app.put('/users/teamName/:userID', middleware.checkAuthentication, function(req, res){
	ctrlUsers.updateTeamName(req, res);
});

app.put('/users/email/:userid', middleware.checkAuthentication, function(req, res){
	ctrlUsers.updateEmail(req, res);
});

//User Streaks Requests
app.get('/standings', middleware.checkAuthentication, function (req, res) {
	ctrlUserStreaks.getStandings(req, res);
});

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

if (env === 'development') {
	var forceSync = {
		force: false
	};
	db.sequelize.sync(forceSync)
	.then(
		app.listen(PORT, function() {
			console.log('express listening on port ' + PORT + '!');
		})
	);
} else {

	// NEVER CHANGE - WILL ERASE ALL DATA ON PRODUCTION
	db.sequelize.sync()
	.then(
		app.listen(PORT, function() {
			console.log('express listening on port ' + PORT + '!');
		})
	);
}







