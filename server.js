var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var app = express();
var db = require('./db.js');
var middleware = require('./middleware.js')(db);
var request = require('request');
var routes = require('./api/routes');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/api', routes);


//DELETE Token- logout
// DELETE users/login
app.delete('/users/login', middleware.requireAuthentication, function(req, res){
	req.token.destroy()
	.then(function(){
		res.status(204).send();
	}).
	catch(function(e){
		res.status(500).send();
	});
});



db.sequelize.sync({force:true})
	.then(
		app.listen(PORT, function() {
			console.log('express listening on port ' + PORT + '!');
		})
	);

