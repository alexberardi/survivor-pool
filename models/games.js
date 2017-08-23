var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('games', {
		game_id: {
			field: 'game_id',
			unique: true,
			type: DataTypes.INTEGER,
			allowNull: false
			},
		home_team_name: {
			field: 'home_team_name',
			type: DataTypes.STRING,
			allowNull: false
		},
		home_team_city_abbr: {
			field: 'home_team_city_abbr',
			type: DataTypes.STRING,
			allowNull: false
		},
		home_score: {
			field: 'home_score',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		away_team_name: {
			field: 'away_team_name',
			type: DataTypes.STRING,
			allowNull: false
		},
		away_team_city_abbr: {
			field: 'away_team_city_abbr',
			type: DataTypes.STRING,
			allowNull: false
		},
		away_score: {
			field: 'away_score',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		day_of_week: {
			field: 'day_of_week',
			type: DataTypes.STRING,
			allowNull: false
		},
		time: {
			field: 'time',
			type: DataTypes.STRING,
			allowNull: false
		},
		game_date: {
			field: 'game_date',
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