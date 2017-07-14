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
app.post('/games/populate', middleware.checkAuthentication, function(req, res) {
	ctrlGames.populateGames(req, res);
});

app.get ('/games/user/:userid', function(req, res){
	ctrlGames.getWeeklyGames(req, res);
});

app.get ('/games/started', function(req, res){
	ctrlGames.getStartedGames(req, res);
});

app.get('/games/week/current', function(req, res){
	ctrlGames.getCurrentWeek(req, res);
});


//Populate teams
app.get('/teams/populate', function(req, res){
	ctrlNFLTeams();
});


//USERS REQUESTS
app.get('/users', function(req, res) {
	ctrlUsers.usersGetAll(req, res);
});

app.get('/users/count', function(req, res) {
	ctrlUsers.userGetCountAll(req, res);
});

app.get('/users/:authid', function(req, res) {		
 	ctrlUsers.userGet(req, res);		
});

app.post('/users', function(req, res) {
 	ctrlUsers.userCreate(req, res);
});

app.put('/users/teamName/:userID', function(req, res){
	ctrlUsers.updateTeamName(req, res);
});

app.put('/users/email/:userid', function(req, res){
	ctrlUsers.updateEmail(req, res);
});

//User Streaks Requests
app.get('/standings', function (req, res) {
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

db.sequelize.sync({force:true})
	.then(
		app.listen(PORT, function() {
			console.log('express listening on port ' + PORT + '!');
		})
	);




