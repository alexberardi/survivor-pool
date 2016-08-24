var _ = require('underscore');

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
        teamId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });
};