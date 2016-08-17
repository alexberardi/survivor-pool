var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('teams', {
		teamName: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		}, 
		teamCity: {
			type: DataTypes.STRING,
			allowNull: false
		},
		logoFileName: {
			type: DataTypes.STRING,
			allowNull: true
		}
	});
};