module.exports = function(sequelize, DataTypes){
    return sequelize.define('teampicks', {
        week: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
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
        team_name: {
            field: 'team_name',
            type: DataTypes.STRING,
            allowNull: false
        },
        game_id: {
            field: 'game_id',
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });
};