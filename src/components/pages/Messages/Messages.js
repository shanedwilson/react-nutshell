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

  componentDidMount() {
    smashRequests.getAllMessagesWithUserInfo()
      .then((messages) => {
        if (messages.length > 10) {
          messages.shift(messages.length - 10, messages.length);
        }
        this.setState({ messages });
      })
      .catch((err) => {
        console.error('error with friends GET', err);
      });
  }

  messageSubmit = (newMessage) => {
    messageRequests.createMessage(newMessage)
      .then(() => {
        smashRequests.getAllMessagesWithUserInfo()
          .then((messages) => {
            if (messages.length > 10) {
              messages.shift(messages.length - 10, messages.length);
            }
            this.setState({ messages });
          });
      }).catch(err => console.error(err));
  }

  deleteSingleMessage = (messageId) => {
    messageRequests.deleteMessage(messageId)
      .then(() => {
        smashRequests.getAllMessagesWithUserInfo()
          .then((messages) => {
            if (messages.length > 10) {
              messages.shift(messages.length - 10, messages.length);
            }
            this.setState({ messages });
          });
      })
      .catch(err => console.error('error with delete single', err));
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
      <div className="messages-container mx-auto">
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
