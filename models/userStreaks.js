module.exports = function(sequelize, DataTypes){
    return sequelize.define('userstreaks', {
        userID: {
            field: 'userID',
            type: DataTypes.STRING,
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