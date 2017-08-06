module.exports = function(sequelize, DataTypes){
    return sequelize.define('teamPicks', {
        week: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userID: {
            field: 'userID',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        teamID: {
            field: 'teamID',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        teamName: {
            field: 'teamName',
            type: DataTypes.STRING,
            allowNull: false
        },
        gameID: {
            field: 'gameID',
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });
};