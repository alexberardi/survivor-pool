var _ = require('underscore');

var env = process.env.NODE_ENV || 'development';

module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define('user', {
		fullName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		userTeamName: {
			field: 'userTeamName',
			type: DataTypes.STRING,
			allowNull: true
		},
		userID: {
			field: 'userID',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		hooks: {
			beforeValidate: function(user, options) {
				if (typeof user.email === 'string') {
					user.email = user.email.toLowerCase();
				}

				if (typeof user.teamname === 'undefined' || user.teamname === '') {
					user.teamname = user.email;
				}
			}
		},
		instanceMethods: {
			toPublicJSON: function() {
				var json = this.toJSON();
				return _.pick(json, 'userID', 'email', 'teamname', 'createdAt', 'updatedAt');
			}
		}
	});
	return user;
};