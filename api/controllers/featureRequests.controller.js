var _ = require('underscore');
var db = require('../../db');


var addFeatureRequest = function(req, res) {

	db.user.findOne({
		where: {
			user_id: req.body.user_id
		}
	})
	.then(function(userFound){
		db.featureRequests.create({
			user_id: req.body.user_id,
			full_name: userFound.full_name,
			feature_text: req.body.message
		})
		.then(function(feature){
			res.status(200).json(feature);
		});
	});


	
};

module.exports = {
	addFeatureRequest: addFeatureRequest
};