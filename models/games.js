var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('games', {
		gameID: {
			field: 'gameID',
			unique: true,
			type: DataTypes.INTEGER,
			allowNull: false
			},
		homeTeamName: {
			field: 'homeTeamName',
			type: DataTypes.STRING,
			allowNull: false
		},
		homeTeamCityAbbr: {
			field: 'homeTeamCityAbbr',
			type: DataTypes.STRING,
			allowNull: false
		},
		homeScore: {
			field: 'homeScore',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		awayTeamName: {
			field: 'awayTeamName',
			type: DataTypes.STRING,
			allowNull: false
		},
		awayTeamCityAbbr: {
			field: 'awayTeamCityAbbr',
			type: DataTypes.STRING,
			allowNull: false
		},
		awayScore: {
			field: 'awayScore',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		dayOfWeek: {
			field: 'dayOfWeek',
			type: DataTypes.STRING,
			allowNull: false
		},
		time: {
			field: 'time',
			type: DataTypes.STRING,
			allowNull: false
		},
		gameDate: {
			field: 'gameDate',
			type: DataTypes.STRING,
			allowNull: false
		},
		quarter: {
			field: 'quarter',
			type: DataTypes.STRING,
			allowNull: false
		},
		week: {
			field: 'week',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});
};