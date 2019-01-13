import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import authRequests from '../../helpers/data/authRequests';
import messageRequests from '../../helpers/data/messageRequests';

import './AddEdit.scss';

const defaultMessage = {
  message: '',
  timestamp: 0,
  isEdited: false,
  uid: '',
};

class AddEdit extends React.Component {
  static propTypes = {
    onsubmit: PropTypes.func,
    // isEditing: PropTypes.bool.isRequired,
    editId: PropTypes.string,
  }

  state = {
    newMessage: defaultMessage,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempMessage = { ...this.state.newMessage };
    tempMessage[name] = e.target.value;
    this.setState({ newMessage: tempMessage });
  }

  messageChange = e => this.formFieldStringState('message', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myMessage = { ...this.state.newMessage };
    myMessage.uid = authRequests.getCurrentUid();
    myMessage.timestamp = moment().valueOf();
    onSubmit(myMessage);
    this.setState({ newMessage: defaultMessage });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      messageRequests.getSingleMessage(editId)
        .then((message) => {
          this.setState({ newMessage: message.data });
        })
        .catch((err) => {
          console.error('error with getSingleMessage', err);
        });
    }
  }

  render() {
    const { newMessage } = this.state;
    // const { isEditing } = this.props;
    // console.log(isEditing);
    return (
      <div className="message-form col">
        <form onSubmit={this.formSubmit}>
          <div class="input-group mt-3 mb-3">
            <div class="input-group-prepend">
              <button type="button" class="btn btn-outline-secondary">
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <input
              type="text"
              id="message"
              className="form-control"
              placeholder=""
              aria-describedby="messageHelp"
              value={newMessage.message}
              onChange={this.messageChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default AddEdit;
