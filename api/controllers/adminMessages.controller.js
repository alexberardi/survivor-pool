var _ = require('underscore');
var db = require('../../db');

var addMessage = function(req, res) {
	var body = _.pick(req.body, 'userID', 'messageText', 'showMessage');

	db.adminMessages.create(body)
		.then(function(message) {
			res.json(message);
		})
		.catch(function(error) {
			res.status(400).send();
		})
};

var deleteMessage = function(req, res) {
	var messageID = req.params.messageID;
	db.adminMessages.findOne({
            where:  {messageID : messageID} 
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
	var body = _.pick(req.body, 'userID', 'messageText', 'showMessage');
	body.messageID = req.params.messageID;

	db.adminMessages.findOne({
        where: {
            messageID: body.messageID
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