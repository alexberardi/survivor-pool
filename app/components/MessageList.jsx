import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as Requests from 'Requests';
import moment from 'moment'; 

import Message from 'Message';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {userID: this.props.userID, messages: null}
        this.addMessage = this.addMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.refreshMessages = this.refreshMessages.bind(this);
    }
    componentWillMount() {
        this.refreshMessages(); 
    }
    refreshMessages() {
        const that = this;
        
        Requests.get('/messages/').then(function(messages) {
            if(messages.data) {
                that.setState({messages: messages.data});
            }
        }); 
    }
    addMessage(e) {
        e.preventDefault();

        const that = this;
        let message = {
            user_id: this.state.userID,
            show_message: true,
            message_text: this.refs.messageText.value,
            message_type: this.refs.messageType.value
        }
        this.refs.messageText.value = '';

        if(message.message_text.length > 0 && message.message_type !== null) {
            Requests.post('/messages/', message)
            .then(function(res) {
                that.refreshMessages();
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    }
    deleteMessage(messageID) {
        const that = this;

        Requests.delete(`/messages/${messageID}`).then(function(res) {
            that.refreshMessages();
        });
    }
    updateMessage(message) {
        const that = this;

        Requests.put(`/messages/${message.message_id}`, message)
        .then(function(res) {
            that.refreshMessages();
        });
    }
	render() {
        let messages = this.state.messages;

        var renderMessages = () => {
            if(messages === null || messages.length === 0) {
                return (
                    <div className="userteam-card">
                        <div className="userteam-card-title">
                            No Messages !
                        </div>
                    </div>
                )
            }

            return messages.map((message) => {
                message.createDate = moment(new Date(message.createdAt)).format("YYYY-MM-DD HH:mm");
                message.updateDate = moment(new Date(message.updatedAt)).format("YYYY-MM-DD HH:mm");
                return <Message key={message.message_id} deleteMessage={this.deleteMessage} updateMessage={this.updateMessage} {...message} />
            });

        }
        
		return (
            <div className="userteams-container">
                <div className="userteams-container-title">
                    Messages
                    <form onSubmit={this.addMessage}>
                        <div className="messages-input-container">
                            <input type="text" ref="messageText" placeholder="Enter Message" className="messages-input" />
                            <div className="messages-type-container">
                                <select className="messages-select" ref="messageType">
                                    <option value="N">Normal</option>
                                    <option value="U">Urgent</option>
                                    <option value="G">Good News</option>
                                </select> 
                             </div> 
                            <button type="submit" className="dashboard-nav-button">Add Message</button>  
                        </div>
                    </form>
                </div>
                {renderMessages()}
            </div>
        )
    }
};

export default Redux.connect()(MessageList);