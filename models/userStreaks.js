module.exports = function(sequelize, DataTypes){
    return sequelize.define('userstreaks', {
        userid: {
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