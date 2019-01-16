import React from 'react';
import SingleMessage from '../../SingleMessage/SingleMessage';
import AddEdit from '../../AddEdit/AddEdit';
import smashRequests from '../../../helpers/data/smashRequests';
import messageRequests from '../../../helpers/data/messageRequests';

import './Messages.scss';

class Messages extends React.Component {
  state = {
    messages: [],
    editId: '-1',
    selectedMessage: '-1',
    isEditing: false,
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

  passMessageToEdit = messageId => this.setState({ isEditing: true, editId: messageId });

  messageSubmit = (newMessage) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      messageRequests.updateMessage(newMessage, editId)
        .then(() => {
          this.getMessagesForComponent();
          this.setState({ isEditing: false, editId: '-1' });
        }).catch((err) => {
          console.error('error with messages post', err);
        });
    } else {
      messageRequests.createMessage(newMessage)
        .then(() => {
          this.getMessagesForComponent();
        });
    }
  }

  render() {
    const {
      isEditing,
      editId,
      messages,
    } = this.state;

    const messageItems = messages.map(message => (
      <SingleMessage
      key={message.id}
      message={message}
      deleteSingleMessage={this.deleteSingleMessage}
      passMessageToEdit={ this.passMessageToEdit }
      />
    ));
    return (
      <div className="messages-container mx-auto mt-3">
        <h2>Messages</h2>
        <div className="messages">
          <div>{messageItems}</div>
        </div>
        <div>
          <AddEdit onSubmit={ this.messageSubmit } isEditing={ isEditing } editId={ editId } />
        </div>
      </div>
    );
  }
}

export default Messages;
