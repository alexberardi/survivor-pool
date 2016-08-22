var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users.controller.js');
var ctrlGames = require('../controllers/games.controller');
var ctrlNFLTeams = require('../controllers/nflTeams.controller');

//USERS API FUNCTIONS
router
    .route('/users')
    .get(ctrlUsers.usersGetAll)
    .post(ctrlUsers.userCreate);

router
    .route('/users/login')
    .post(ctrlUsers.userLogin)

//END OF USERS API FUNCTIONS

//GAMES API FUNCTIONS
router
    .route('/games/populate')
    .get(ctrlGames.populateGames);

router
    .route('/games')
    .get(ctrlGames.getWeeklyGames)
//END OF GAMES API FUNCTIONS

//NFL TEAMS API FUNCTIONS
router
    .route('/teams/populate')
    .get(ctrlNFLTeams)
//END OF NFL TEAMS API FUNCTIONS



module.exports = router;