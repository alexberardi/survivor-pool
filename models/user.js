var _ = require('underscore');

var env = process.env.NODE_ENV || 'development';

module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define('user', {
		full_name: {
			field: 'full_name',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		user_id: {
			field: 'user_id',
			type: DataTypes.STRING,
			allowNull: false
		},
		is_admin: {
			field: 'is_admin',
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		has_paid: {
			field: 'has_paid',
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		picture_url: {
			field: 'picture_url',
			type: DataTypes.STRING,
			allowNull: true
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
				return _.pick(json, 'user_id', 'email', 'createdAt', 'updatedAt');
			}
		}
	});
	return user;
};