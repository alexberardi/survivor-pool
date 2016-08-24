module.exports = function(sequelize, DataTypes){
    return sequelize.define('userPicks', {
        week: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        teamName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });
};