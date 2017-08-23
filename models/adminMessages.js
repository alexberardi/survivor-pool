var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('adminmessages', {
		message_id: {
			field: 'message_id',
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false			
		},
		user_id: {
			field: 'user_id',
			type: DataTypes.STRING,
			primaryKey: false,
			allowNull: false
		}, 
		message_text: {
			field: 'message_text',
			type: DataTypes.STRING,
			allowNull: false
		},
		show_message: {
			field: 'show_message',
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
		message_type: {
			field: 'message_type',
			type: DataTypes.STRING,
			allowNull: false
		}
	});
};