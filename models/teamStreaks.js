module.exports = function(sequelize, DataTypes){
    return sequelize.define('teamstreaks', {
        user_id: {
            field: 'user_id',
            type: DataTypes.STRING,
            allowNull: false
        },
        team_id: {
            field: 'team_id',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        current: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
};