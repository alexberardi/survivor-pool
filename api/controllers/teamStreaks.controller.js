var _ = require('underscore');
var db = require('../../db');

var updateStreak = function(req, res) {
       var body = _.pick(req.body, 'user_id', 'current');

        db.teamStreaks.findOne({where: {user_id: body.user_id, current: true}})
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
    var user_id = parseInt(req.params.user_id, 10);
    db.sequelize.query('SELECT userstreaks.total, users.team_name, users.first, users.last, userstreaks.current FROM userstreaks JOIN users on userstreaks.user_id = users.user_id ORDER BY userstreaks.total DESC')
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
    var user_id = parseInt(req.params.user_id, 10);
    db.teamStreaks.findOne({
        where: {
            user_id: user_id
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

