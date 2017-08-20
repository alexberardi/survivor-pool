import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as Requests from 'Requests';
import FaEye from 'react-icons/lib/fa/eye';
import FaEyeSlash from 'react-icons/lib/fa/eye-slash';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEdit from 'react-icons/lib/fa/edit';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {showMessage: props.showMessage, changeMessage: false}
        this.startDelete = this.startDelete.bind(this);
        this.startToggleVisible = this.startToggleVisible.bind(this);
        this.startUpdateMessage = this.startUpdateMessage.bind(this);
        this.submitUpdateMessage = this.submitUpdateMessage.bind(this);
    }
    startDelete(e) {
        e.preventDefault();

        this.props.deleteMessage(this.props.messageID);
    }
    startToggleVisible(e) {
        e.preventDefault();

        let message = {
            messageID: this.props.messageID,
            userID: this.props.userID,
            messageText: this.props.messageText,
            showMessage: !this.props.showMessage,
            messageType: this.props.messageType
        }
        this.setState({showMessage: !this.props.showMessage});
        this.props.updateMessage(message);
    }
    startUpdateMessage(e) {
        e.preventDefault();
        this.setState({changeMessage: true});
    }
    submitUpdateMessage(e) {
        e.preventDefault();
        let message = {
            messageID: this.props.messageID,
            userID: this.props.userID,
            messageText: this.refs.messageText.value,
            showMessage: this.props.showMessage,
            messageType: this.refs.messageType.value
        }
        this.setState({changeMessage: false});
        this.props.updateMessage(message);
    }
	render() {
        let showMessage = this.state.showMessage;
        let changeMessage = this.state.changeMessage;
        let messageType = this.props.messageType;

        switch(messageType) {
            case 'U':
                messageType = "Urgent";          
                break;
            case 'N':
                messageType = "Normal";
                break;
            default:
                messageType="Normal";
                break;				
        }

        let message = null;
        let visible = null;

        if(showMessage) {
            visible = <a href="#" onClick={this.startToggleVisible}><FaEye size={25} style={{color: '#00ad61'}}/></a>
        } else {
            visible = <a href="#" onClick={this.startToggleVisible}><FaEyeSlash size={25} style={{color: '#AA3939'}}/></a>
        }

        if(changeMessage) {
            message =
                <div> 
                    <form onSubmit={this.submitUpdateMessage}>
                        <div className="messages-update-container">
                            <input type="text" className="messages-input" ref="messageText" defaultValue={this.props.messageText}/>
                            <div className="messages-type-container">
                                <select className="messages-select" ref="messageType">
                                    <option value="U">Urgent</option>
                                    <option value="N">Normal</option>
                                </select> 
                             </div> 
                            <button type="submit" className="secondary-button">Change</button>
                        </div>
                    </form>
                </div>
        } else {
            message = <a href="#" className="team-link" onClick={this.startUpdateMessage}>{this.props.messageText}<FaEdit size={25} style={{marginLeft: '12px'}} /></a>
        }


		return (
            <div className="card-row">
                <div className="userteam-card">
                    <div className="userteam-card-title">
                            {message}
                        <div className="userteam-card-title-icons">
                            {visible}
                            <a href="#" onClick={this.startDelete}><FaTrashO size={25} style={{color: '#AA3939'}}/></a>
                        </div>
                    </div>
                    <div className="userteam-card-content">
                        <div className="userteam-card-item">Message Type: {messageType}</div>
                        <div className="userteam-card-item">Added on: {this.props.createDate}</div>
                        <div className="userteam-card-item">Updated on: {this.props.updateDate}</div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Redux.connect()(Message);