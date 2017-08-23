module.exports = function(sequelize, DataTypes){
	return sequelize.define('playerteams', {
        team_id: {
			field: 'team_id',
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false
        },
        user_id: {
			field: 'user_id',
			type: DataTypes.STRING,
			allowNull: false
		},
		team_name: {
			field: 'team_name',
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
        },
        is_active: {
			field: 'is_active',
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
        },
        has_paid: {
			field: 'has_paid',
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
	});
};