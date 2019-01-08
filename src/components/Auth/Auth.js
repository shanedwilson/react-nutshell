import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import './Auth.scss';

import googleButton from './images/googlebutton.png';

class Auth extends React.Component {
  static propTypes ={
    isAuthenticated: PropTypes.func,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.isAuthenticated();
    })
      .catch(err => console.error('there was a problem with auth', err));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-danger mt-5 mb-5" onClick={this.authenticateUser}>
          <img src={googleButton} alt="google login button" />
        </button>
      </div>
    );
  }
}

export default Auth;
