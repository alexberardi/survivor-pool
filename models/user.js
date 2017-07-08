var _ = require('underscore');
var jwt = require('jsonwebtoken');

var env = process.env.NODE_ENV || 'development';

module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define('user', {
		first: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last: {
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
		teamname: {
			type: DataTypes.STRING,
			allowNull: true
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
				return _.pick(json, 'id', 'email', 'teamname', 'createdAt', 'updatedAt');
			}
		}
	});
	return user;
};