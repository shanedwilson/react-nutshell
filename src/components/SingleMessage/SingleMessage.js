import React from 'react';
import PropTypes from 'prop-types';

import './SingleMessage.scss';

class SingleMessage extends React.Component {
  static propTypes = {
    message: PropTypes.messageShape.messageShape,
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
