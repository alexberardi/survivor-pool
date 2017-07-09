module.exports = function(sequelize, DataTypes){
    return sequelize.define('tokens', {
        userID: {
            field: 'userID',
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            field: 'token',
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};