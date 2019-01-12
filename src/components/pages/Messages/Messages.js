import React from 'react';
// import Requests from '../../../helpers/data/messageRequests';
import SingleMessage from '../../SingleMessage/SingleMessage';
import './Messages.scss';
import smashRequests from '../../../helpers/data/smashRequests';

class Messages extends React.Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    smashRequests.getAllMessagesWithUserInfo()
      .then((messages) => {
        if (messages.length > 1) {
          messages.shift(messages.length - 1, messages.length);
        }
        this.setState({ messages });
      })
      .catch((err) => {
        console.error('error with friends GET', err);
      });
  }

  render() {
    const messageItems = this.state.messages.map(message => (
    <SingleMessage
    key={message.id}
    message={message}
    />
    ));
    return (
      <div className="messages-container mx-auto">
        <h2>Messages</h2>
        <div className="messages">
          <div className="">{messageItems}</div>
        </div>
      </div>
    );
  }
}

export default Messages;
