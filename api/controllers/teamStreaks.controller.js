var _ = require('underscore');
var db = require('../../db');

var updateStreak = function(req, res) {
       var body = _.pick(req.body, 'userID', 'current');

        db.teamStreaks.findOne({where: {userID: body.userID, current: true}})
            .then(function(streak){
                if (Boolean(body.current) === true) {
                    body.total = streak.total + 1;
                } else {
                    body.total = streak.total;
                }
                return streak.update(body)
                    .then(function(streak){
                       res.json(streak.toJSON());
                    },
                    function(e){
                        res.status(404).json(e);
                    });
            }, function(e){
               res.status(404).send();
            })
            .catch(function(e){
                res.status(500).send();
            });
};

var getStandings = function(req, res) {
    var userID = parseInt(req.params.userID, 10);
    db.sequelize.query('SELECT userStreaks.total, users.teamName, users.first, users.last, userStreaks.current FROM userStreaks JOIN users on userStreaks.userID = users.userID ORDER BY userStreaks.total DESC')
        .then(function(streaks){
            res.json(streaks);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};


var getCountActive = function(req, res) {
    db.teamStreaks.count({where: {current: true}})
        .then(function(streaks){
            res.json(streaks);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};

var checkActive = function (req, res) {
    var userID = parseInt(req.params.userID, 10);
    db.teamStreaks.findOne({
        where: {
            userID: userID
        }
    })
        .then(function(streak){
          if (streak.current === true) {
              res.status(200).send();
          }
          else {
              res.status(401).send();
          }
        })
};

module.exports = {
    updateStreak: updateStreak,
    getStandings: getStandings,
    checkActive: checkActive,
    getCountActive: getCountActive
};

