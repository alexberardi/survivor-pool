var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('nflTeams', {
		teamName: {
			field: 'teamName',
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		}, 
		teamCity: {
			field: 'teamCity',
			type: DataTypes.STRING,
			allowNull: false
		}
	});
};