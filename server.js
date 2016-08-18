// var express = require('express');
// var bodyParser = require('body-parser');
// var _ = require('underscore');
// var bcrypt = require('bcryptjs');
// var app = express();
// var db = require('./db.js');
// var PORT = process.env.PORT || 3000;
// var middleware = require('./middleware.js')(db);
// var request = require('request');
// app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public'));

// app.get('/users', function(req, res) {
// 	db.user.findAll()
// 		.then(function(users){
// 			res.json(users);
// 		})
// 		.catch(function(e){
// 			res.status(400).send();
// 		});
// });

// app.get('/teams/populate', function(req, res){
// 	request.get('http://www.nfl.com/liveupdate/scorestrip/ss.json', function(err, innerRes, body){
// 		body = JSON.parse(body)

// 		games = body.gms;
// 		var error;

// 		games.forEach(function(game){
// 			var sanitizeTeam = _.pick(game, 'h', 'v', 'vnn', 'hnn');
			
// 			var homeTeamInfo = {
// 				teamName: sanitizeTeam.hnn,
// 				teamCity: sanitizeTeam.h,
// 				logoFileName: sanitizeTeam.hnn + '.gif'
// 			}
// 			var awayTeamInfo ={
// 				teamName: sanitizeTeam.vnn,
// 				teamCity: sanitizeTeam.v,	
// 				logoFileName: sanitizeTeam.vnn + '.gif',			
// 			}

// 			db.teams.create(homeTeamInfo)
// 				.catch(function(e){
// 					error = e;
// 				});

// 			db.teams.create(awayTeamInfo)
// 				.catch(function(e){
// 					error = e;
// 				});
// 		})
// 		if (!error) {
// 			res.status(200).send();
// 		} else {
// 			res.status(400).json(e);
// 		}

// 	});
// });


// app.get('/games/populate', function(req, res){
// 	request.get('http://www.nfl.com/liveupdate/scorestrip/ss.json', function(err, innerRes, body){
// 		body = JSON.parse(body)
// 		week = body.w;

// 		games = body.gms;
// 		var error;

// 		games.forEach(function(game){
// 			var sanitizeGame = _.pick(game, 'hs', 'd', 'gsis', 'vs', 'eid', 'h', 'v', 'vnn', 't', 'q', 'hnn');
			
// 			var gameInfo = {
// 				gameID: sanitizeGame.gsis,
// 				homeTeamName: sanitizeGame.hnn,
// 				homeTeamCityAbbr: sanitizeGame.h,
// 				homeScore: sanitizeGame.hs,
// 				awayTeamName: sanitizeGame.vnn,
// 				awayTeamCityAbbr: sanitizeGame.v,
// 				awayScore: sanitizeGame.vs,
// 				dayOfWeek: sanitizeGame.d,
// 				time: sanitizeGame.t,
// 				gameDate: sanitizeGame.eid,
// 				quarter: sanitizeGame.q,
// 				week: week,
// 			}
// 			db.games.create(gameInfo)
// 				.catch(function(e){
// 					error = e;
// 				});
// 		})
// 		if (!error) {
// 			res.status(200).send();
// 		} else {
// 			res.status(400).json(e);
// 		}

// 	});
// });

// app.get('/games', function(req, res){
// 	db.games.max('week')
//   	.then(function(max){
//   		db.games.findAll({
//   			where: {week : max}
//   		})
//   		.then(function(weeks){
//   			res.json(weeks);
//   		})
//   		.catch(function(e){
//   			return res.status(500).json(e);
//   		});
//   	})
//   	.catch(function(e){
//   			return res.status(500).json(e);
//   		});
// });

// //post user
// app.post('/users', function(req,res){
// 	var body = _.pick(req.body, 'first', 'last', 'email', 'password', 'teamName');
// 	db.user.create(body)
// 		.then(function(user) {
// 			res.json(user.toPublicJSON());
// 		})
// 		.catch(function(e) {
// 			console.log(e);
// 			res.status(400).json(e);
// 		});
// });

// //POST /users/login
// app.post('/users/login', function(req, res) {
// 	var body = _.pick(req.body, 'email', 'password');
// 	var userInstance;

// 	db.user.authenticate(body)
// 		.then(function(user) {

// 			var token = user.generateToken('authentication');
// 			userInstance = user;
// 			return db.token.create({
// 					token: token
// 				})
// 				.then(function(tokenInstance) {
// 					if (token) {
// 						res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
// 					} else {
// 						res.status(401).send();
// 					}
// 				})
// 		})
// 		.catch(function(e) {
// 			res.status(401).send();
// 		});
// });

// //DELETE Token- logout
// // DELETE users/login
// app.delete('/users/login', middleware.requireAuthentication, function(req, res){
// 	req.token.destroy()
// 	.then(function(){
// 		res.status(204).send();
// 	}).
// 	catch(function(e){
// 		res.status(500).send();
// 	});
// });



// db.sequelize.sync()
// 	.then(
// 		app.listen(PORT, function() {
// 			console.log('express listening on port ' + PORT + '!');
// 		})
// 	);