module.exports = function(sequelize, DataTypes){
    return sequelize.define('teamStreaks', {
        userID: {
            field: 'userID',
            type: DataTypes.STRING,
            allowNull: false
        },
        teamID: {
            field: 'teamID',
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