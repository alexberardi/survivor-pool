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
var ctrlAdminMessages = require('./api/controllers/adminMessages.controller');
var ctrlAdminTools = require('./api/controllers/adminTools.controller.js');
var ctrlFeatureRequests = require('./api/controllers/featureRequests.controller.js');
var ctrlGames = require('./api/controllers/games.controller');
var ctrlNFLTeams = require('./api/controllers/nflTeams.controller');
var ctrlToken = require('./api/controllers/tokens.js');
var ctrlUsers = require('./api/controllers/users.controller');
var ctrlUserStreaks = require('./api/controllers/teamStreaks.controller');
var ctrlPlayerTeams = require('./api/controllers/playerTeams.controller.js');
var ctrlTeamPicks = require('./api/controllers/teamPicks.controller.js');

//Middleware
var middleware = require('./middleware/common.middleware.js');

app.use(bodyParser.json());

//Admin Tools Requests
app.put('/admin/advanceWeek/:week',  middleware.checkAuthentication, middleware.checkAdmin, function(req, res){
	ctrlAdminTools.advanceWeek(req, res);
});

app.post('/features', middleware.checkAuthentication, function(req, res){
	ctrlFeatureRequests.addFeatureRequest(req, res);
});

//Games Requests
app.post('/games/populate', middleware.checkAuthentication, middleware.checkAdmin, function(req, res) {
	ctrlGames.populateGames(req, res);
});

app.get ('/games/user/:user_id', middleware.checkAuthentication, function(req, res){
	ctrlGames.getWeeklyGames(req, res);
});

app.get ('/games/started', middleware.checkAuthentication, function(req, res){
	ctrlGames.getStartedGames(req, res);
});

app.get('/games/week/current', middleware.checkAuthentication, function(req, res){
	ctrlGames.getCurrentWeek(req, res);
});

app.post('/games/update', middleware.checkAuthentication, function(req, res) {
	ctrlGames.updateGames(req, res);
});

//picks requests

app.post('/picks/:team_id', middleware.checkAuthentication, middleware.checkTeamID, function(req, res) {
	ctrlTeamPicks.makePick(req, res);
});

app.get('/picks/:user_id/:team_id', middleware.checkAuthentication,  middleware.checkTeamID, function(req, res) {
	ctrlTeamPicks.getCurrentPicks(req, res);
});

app.get('/picks/last/:user_id/:team_id', middleware.checkAuthentication, function(req, res) {
	ctrlTeamPicks.getLastWeekPick(req, res);
});

app.get('/picks/all/:user_id/:team_id', middleware.checkAuthentication, function(req, res) {
	ctrlTeamPicks.getPicks(req, res);
});

app.get('/popular/picks/:week', middleware.checkAuthentication, function(req, res) {
	ctrlTeamPicks.getPopularPicks(req, res);
});

app.get('/popular/teams/all', middleware.checkAuthentication, function(req, res) {
	ctrlTeamPicks.getAllPopularPicks(req, res);
});

app.get('/schedule/:user_id/:team_id/:week', middleware.checkAuthentication, middleware.checkTeamID, function(req, res){
	ctrlTeamPicks.getSchedule(req, res);
});

//Messages requests
app.post('/messages/', middleware.checkAuthentication, middleware.checkAdmin, function(req, res) {
	ctrlAdminMessages.addMessage(req, res);
});

app.delete('/messages/:message_id', middleware.checkAuthentication, middleware.checkAdmin, function(req, res) {
	ctrlAdminMessages.deleteMessage(req, res);
});

app.put('/messages/:message_id', middleware.checkAuthentication, middleware.checkAdmin, function(req, res) {
	ctrlAdminMessages.updateMessage(req, res);
});

app.get('/messages/', middleware.checkAuthentication, function(req, res) {
	ctrlAdminMessages.selectAllMessages(req, res);
})

app.get('/messages/active/', middleware.checkAuthentication, function(req, res) {
	ctrlAdminMessages.selectActiveMessages(req, res);
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

app.get('/users/:user_id', middleware.checkAuthentication, function(req, res) {	
 	ctrlUsers.userGet(req, res);		
});

app.get('/users/exists/:user_id', function(req, res) {
	ctrlUsers.userCheck(req, res);
});

app.post('/users', function(req, res) {
 	ctrlUsers.userCreate(req, res);
});

app.put('/users/email/:user_id', middleware.checkAuthentication, function(req, res){
	ctrlUsers.updateEmail(req, res);
});

//User Streaks Requests
app.get('/standings', middleware.checkAuthentication, function (req, res) {
	ctrlUserStreaks.getStandings(req, res);
});

app.get('/streaks/all', middleware.checkAuthentication, function(req, res) {
	ctrlUserStreaks.getCountAll(req, res);
});

app.get('/streaks/active', middleware.checkAuthentication, function(req, res) {
	ctrlUserStreaks.getCountActive(req, res);
});

//User Teams Requests
app.delete('/teams/:user_id/:team_id', middleware.checkAuthentication, middleware.checkTeamID, function(req, res) {
	ctrlPlayerTeams.deleteTeam(req, res);
});

app.get('/teams/:user_id', middleware.checkAuthentication, function(req, res) {
	ctrlPlayerTeams.teamsGetAll(req, res);
});

app.get('/teams/admin/users', middleware.checkAuthentication, middleware.checkAdmin, function(req, res) {
	ctrlPlayerTeams.teamsGetAllAdmin(req, res);
});

app.post('/teams', middleware.checkAuthentication, function(req, res) {
	ctrlPlayerTeams.teamCreate(req, res);
});

app.put('/teams/:team_id', middleware.checkAuthentication, middleware.checkTeamID, function(req, res){
	ctrlPlayerTeams.updateTeamName(req, res);
});

app.put('/teams/active/:team_id', middleware.checkAuthentication, middleware.checkAdmin, function(req, res) {
	ctrlPlayerTeams.updateTeamActive(req, res);
});

app.put('/teams/paid/:team_id', middleware.checkAuthentication, middleware.checkAdmin, function(req, res) {
	ctrlPlayerTeams.updateTeamPaid(req, res);
});

app.put('/teams/name/:team_id', middleware.checkAuthentication, middleware.checkAdmin, function(req, res) {
	ctrlPlayerTeams.updateTeamName(req, res);
});

app.get('/teams/check/:user_id/:team_id', middleware.checkAuthentication, middleware.checkTeamID, function(req, res) {
	ctrlPlayerTeams.checkActive(req, res);
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







