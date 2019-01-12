import React from 'react';
import messageRequests from '../../../helpers/data/messageRequests';
import SingleMessage from '../../SingleMessage/SingleMessage';
import './Messages.scss';

class Messages extends React.Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    messageRequests.getAllMessages()
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
