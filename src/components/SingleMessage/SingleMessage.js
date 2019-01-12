import React from 'react';

import './SingleMessage.scss';

class SingleMessage extends React.Component {
  render() {
    return (
      <div className="single-message mt-3">
      <span className="message-user col-3">{this.props.message.uid}</span>
      <span className="message-text col-7 justify-content-end">{this.props.message.message}</span>
      </div>
    );
  }
}

export default SingleMessage;
