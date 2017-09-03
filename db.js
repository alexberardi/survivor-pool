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
db.nflTeams = sequelize.import(__dirname + '/models/nflTeams.js');
db.tokens = sequelize.import(__dirname + '/models/tokens.js');
db.teamPicks = sequelize.import(__dirname + '/models/teamPicks.js');
db.teamStreaks = sequelize.import(__dirname + '/models/teamStreaks.js');
db.playerTeams = sequelize.import(__dirname + '/models/playerTeams.js');
db.adminMessages = sequelize.import(__dirname + '/models/adminMessages.js');
db.featureRequests = sequelize.import(__dirname + '/models/featureRequests.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;