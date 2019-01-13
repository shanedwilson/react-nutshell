import React from 'react';
import SingleMessage from '../../SingleMessage/SingleMessage';
import AddEdit from '../../AddEdit/AddEdit';
import smashRequests from '../../../helpers/data/smashRequests';
import messageRequests from '../../../helpers/data/messageRequests';

import './Messages.scss';

class Messages extends React.Component {
  state = {
    messages: [],
  }

  getMessagesForComponent = () => {
    smashRequests.getAllMessagesWithUserInfo()
      .then((messages) => {
        if (messages.length > 10) {
          messages.splice(0, messages.length - 10);
        }
        this.setState({ messages });
      })
      .catch((err) => {
        console.error('error with friends GET', err);
      });
  }

  componentDidMount() {
    this.getMessagesForComponent();
  }

  deleteSingleMessage = (messageId) => {
    messageRequests.deleteMessage(messageId);
    this.getMessagesForComponent();
  }

  messageSubmit = (newMessage) => {
    messageRequests.createMessage(newMessage)
      .then(() => {
        this.getMessagesForComponent();
      });
  }

  render() {
    const messageItems = this.state.messages.map(message => (
      <SingleMessage
      key={message.id}
      message={message}
      deleteSingleMessage={this.deleteSingleMessage}
      />
    ));
    return (
      <div className="messages-container mx-auto mt-5">
        <h2>Messages</h2>
        <div className="messages">
          <div>{messageItems}</div>
          <AddEdit onSubmit={ this.messageSubmit } />
        </div>
      </div>
    );
  }
}

export default Messages;
