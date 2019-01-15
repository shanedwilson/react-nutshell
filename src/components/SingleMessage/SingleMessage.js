import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import messageShape from '../../helpers/propz/messageShape';

import './SingleMessage.scss';

class SingleMessage extends React.Component {
  static propTypes = {
    message: messageShape,
    deleteSingleMessage: PropTypes.func,
    passMessageToEdit: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleMessage, message } = this.props;
    deleteSingleMessage(message.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passMessageToEdit, message } = this.props;
    passMessageToEdit(message.id);
  }

  render() {
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (this.props.message.uid === uid) {
        return (
          <div className="col">
              <button className="btn btn-default" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button className="btn btn-default" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt"></i>
              </button>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };

    const singleMessage = () => {
      if (this.props.message.isEdited === false) {
        return (
          <div className="single-message m-3">
            <span className="message-user col-3">{this.props.message.userName}</span>
            <span className="message-text col-7 justify-content-end">{this.props.message.message}</span>
            <span>{makeButtons()}</span>
          </div>
        );
      }
      return (
          <div className="single-message m-3">
            <span className="message-user col-3">{this.props.message.userName}</span>
            <span className="message-text col-7 justify-content-end">{this.props.message.message}</span>
            <span>{makeButtons()}</span>
            <span className="message-edited font-italic justify-content-end">edited</span>
          </div>
      );
    };

    return (
      <span>{singleMessage()}</span>
    );
  }
}

export default SingleMessage;
