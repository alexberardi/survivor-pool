var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('featurerequests', {
		feature_id: {
			field: 'feature_id',
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
		full_name: {
			field: 'full_name',
			type: DataTypes.STRING,
			primaryKey: false,
			allowNull: false
		}, 
		feature_text: {
			field: 'message_text',
			type: DataTypes.STRING,
			allowNull: false
		}
	});
};



