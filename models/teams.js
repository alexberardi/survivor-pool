var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('teams', {
		teamname: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		}, 
		teamcity: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
};