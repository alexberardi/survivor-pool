var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('games', {
		gameID: {
			unique: true,
			type: DataTypes.INTEGER,
			allowNull: false
			},
		homeTeamName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		homeTeamCityAbbr: {
			type: DataTypes.STRING,
			allowNull: false
		},
		homeScore: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		awayTeamName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		awayTeamCityAbbr: {
			type: DataTypes.STRING,
			allowNull: false
		},
		awayScore: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		dayOfWeek: {
			type: DataTypes.STRING,
			allowNull: false
		},
		time: {
			type: DataTypes.TIME,
			allowNull: false
		},
		gameDate: {
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