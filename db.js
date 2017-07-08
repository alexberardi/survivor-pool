var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		'dialect': 'postgres'
	});
} else{
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-survivor-api.sqlite'
	});	
}

var db = {};
db.user = sequelize.import(__dirname + '/models/user.js');
db.games = sequelize.import(__dirname + '/models/games.js');
db.teams = sequelize.import(__dirname + '/models/teams.js');
db.userPicks = sequelize.import(__dirname + '/models/userPicks.js');
db.userStreaks = sequelize.import(__dirname + '/models/userStreaks.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;