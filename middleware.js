var cryptojs = require('crypto-js');

module.exports = function(db){
	return {
		requireAuthentication: function(req, res, next){
			var token = req.get('Auth') || '';
			db.token.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString()
				}
			})
			.then(function(tokenInstance){
				if (!tokenInstance){
					throw new Error();
				}
				req.token = tokenInstance;
				return db.user.findByToken(token);
			})
			.then(function(user){

				if (req.params.hasOwnProperty('userid')){
					if (req.params.userid != user.id) {
						reject();
					}
				}

				req.user = user;
				next();
			})
			.catch(function(e){
				res.status(401).send();
			});
		}
	};

}