var _ = require('underscore');
var db = require('../../db');

var addMessage = function(req, res) {
	var body = _.pick(req.body, 'user_id', 'message_text', 'show_message', 'message_type');

	db.adminMessages.create(body)
		.then(function(message) {
			res.json(message);
		})
		.catch(function(error) {
			res.status(400).send();
		})
};

var deleteMessage = function(req, res) {
	var message_id = req.params.message_id;
	db.adminMessages.findOne({
            where:  {message_id : message_id} 
        })
    .then(function(message){
        message.destroy();
        res.status(200).send();
    })
    .catch(function(error) {
        console.log(error);
        res.status(500).send();
    });
};

var updateMessage = function(req, res) {
	var body = _.pick(req.body, 'user_id', 'message_text', 'show_message', 'message_type');
	body.message_id = req.params.message_id;

	db.adminMessages.findOne({
        where: {
            message_id: body.message_id
        }
    })
    .then(function(message) {
            return message.update(body)
                .then(function(messageInner) {
                    res.json(messageInner.toJSON());
                }, function(e) {
                    res.status(400).json(e);
                });
    }, function() {
        res.status(500).send();
    });
}

var selectAllMessages = function(req, res) {
    db.adminMessages.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(messages) {
        res.json(messages);
    })
    .catch(function(error) {
        console.log(error);
        res.status(500).send();
    });
}

var selectActiveMessages = function(req, res) {
    db.adminMessages.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        where: {
            showMessage: true
        }
    }).then(function(messages) {
        res.json(messages);
    })
    .catch(function(error) {
        console.log(error);
        res.status(500).send();
    });
}

module.exports = {
	addMessage: addMessage,
	deleteMessage: deleteMessage,
    updateMessage: updateMessage,
    selectAllMessages: selectAllMessages,
    selectActiveMessages: selectActiveMessages
}