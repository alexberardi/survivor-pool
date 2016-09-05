module.exports = function(sequelize, DataTypes){
    return sequelize.define('userpicks', {
        week: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        teamname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gameid: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });
};