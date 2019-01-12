import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import messageShape from '../../helpers/propz/messageShape';

import './SingleMessage.scss';

class SingleMessage extends React.Component {
  static propTypes = {
    message: messageShape,
    deleteSingleMessage: PropTypes.func,
  }

    deleteEvent = (e) => {
      e.preventDefault();
      const { deleteSingleMessage, message } = this.props;
      deleteSingleMessage(message.id);
    }

    render() {
      const uid = authRequests.getCurrentUid();

      const makeButtons = () => {
        if (this.props.message.uid === uid) {
          return (
          <div>
              <button className="btn btn-default" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt"></i>
              </button>
          </div>
          );
        }
        return <span className="col-2"></span>;
      };

      return (
        <div className="single-message mt-3">
        <span className="message-user col-3">{this.props.message.userName}</span>
        <span className="message-text col-7 justify-content-end">{this.props.message.message}</span>
        <span className="col-1">{makeButtons()}</span>
        </div>
      );
    }
}

export default SingleMessage;
