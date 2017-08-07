module.exports = function(sequelize, DataTypes){
	return sequelize.define('playerTeams', {
        teamID: {
			field: 'teamID',
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false
        },
        userID: {
			field: 'userID',
			type: DataTypes.STRING,
			allowNull: false
		},
		teamName: {
			field: 'teamName',
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
        },
        isActive: {
			field: 'isActive',
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
        },
        hasPaid: {
			field: 'hasPaid',
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
	});
};