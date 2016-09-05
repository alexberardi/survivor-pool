module.exports = function(sequelize, DataTypes){
    return sequelize.define('userstreaks', {
        userId: {
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