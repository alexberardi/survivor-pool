var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('adminMessages', {
		messageID: {
			field: 'messageID',
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false			
		},
		userID: {
			field: 'userID',
			type: DataTypes.STRING,
			primaryKey: false,
			allowNull: false
		}, 
		messageText: {
			field: 'messageText',
			type: DataTypes.STRING,
			allowNull: false
		},
		showMessage: {
			field: 'showMessage',
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
		messageType: {
			field: 'messageType',
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'adminMessages',
		freezeTableName: true
	});
};