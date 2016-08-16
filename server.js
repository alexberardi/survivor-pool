var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var bcrypt = require('bcrypt');var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());


app.get('/', function(req, res) {
	res.send('Todo API Root');
});

app.listen(PORT, function() {
			console.log('express listening on port ' + PORT + '!');
		});