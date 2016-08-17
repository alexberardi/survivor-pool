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
		}
	},
	{
		hooks: {
			beforeValidate: function(teams, options) {
				if (typeof teams.logoFileName === 'string') {
					teams.logoFileName = 'teamLogos/' + teams.logoFileName.toLowerCase();
				}
			}
		}
	}

	);
};