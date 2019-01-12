import React from 'react';
import messageRequests from '../../../helpers/data/messageRequests';
import './Messages.scss';

class Messages extends React.Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    messageRequests.getAllMessages()
      .then((messages) => {
        this.setState({ messages });
        console.log(messages);
      })
      .catch((err) => {
        console.error('error with friends GET', err);
      });
  }

  render() {
    return (
      <div className="messages mx-auto">
        <h1>Messages Component</h1>
      </div>
    );
  }
}

export default Messages;
