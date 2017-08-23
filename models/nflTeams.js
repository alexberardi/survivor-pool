var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('nflteams', {
		team_name: {
			field: 'team_name',
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		}, 
		team_city: {
			field: 'team_city',
			type: DataTypes.STRING,
			allowNull: false
		}
	});
};