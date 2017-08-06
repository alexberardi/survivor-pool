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
		userID: {
			field: 'userID',
			type: DataTypes.STRING,
			allowNull: false
		},
		isAdmin: {
			field: 'isAdmin',
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		hasPaid: {
			field: 'hasPaid',
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		hooks: {
			beforeValidate: function(user, options) {
				if (typeof user.email === 'string') {
					user.email = user.email.toLowerCase();
				}
			}
		},
		instanceMethods: {
			toPublicJSON: function() {
				var json = this.toJSON();
				return _.pick(json, 'userID', 'email', 'createdAt', 'updatedAt');
			}
		}
	});
	return user;
};