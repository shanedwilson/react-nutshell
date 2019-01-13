import React from 'react';
import messageShape from '../../helpers/propz/messageShape';

import './SingleMessage.scss';

class SingleMessage extends React.Component {
  static propTypes = {
    message: messageShape,
  }

  render() {
    return (
      <div className="single-message mt-3">
      <span className="message-user col-3">{this.props.message.userName}</span>
      <span className="message-text col-7 justify-content-end">{this.props.message.message}</span>
      </div>
    );
  }
}

export default SingleMessage;