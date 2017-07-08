var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('games', {
		gameid: {
			unique: true,
			type: DataTypes.INTEGER,
			allowNull: false
			},
		hometeamname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		hometeamcityabbr: {
			type: DataTypes.STRING,
			allowNull: false
		},
		homescore: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		awayteamname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		awayteamcityabbr: {
			type: DataTypes.STRING,
			allowNull: false
		},
		awayscore: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		dayofweek: {
			type: DataTypes.STRING,
			allowNull: false
		},
		time: {
			type: DataTypes.TIME,
			allowNull: false
		},
		gamedate: {
			type: DataTypes.STRING,
			allowNull: false
		},
		quarter: {
			type: DataTypes.STRING,
			allowNull: false
		},
		week: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});
};