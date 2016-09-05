var _ = require('underscore');
var db = require('../../db');

var updateStreak = function(req, res) {
       var body = _.pick(req.body, 'userid', 'current');

        db.userStreaks.findOne({where: {userid: body.userid, current: true}})
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
    var userID = parseInt(req.params.userid, 10);
    db.sequelize.query('SELECT * FROM userStreaks JOIN users on userStreaks.userId = users.Id ORDER BY userStreaks.total DESC')
        .then(function(streaks){
            res.json(streaks);
        })
        .catch(function(e){
            return res.status(500).json(e);
        });
};

var checkActive = function (req, res) {
    var userid = parseInt(req.params.userid, 10);
    db.userStreaks.findOne({
        where: {
            userid: userid
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
    checkActive: checkActive
};

