import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../helpers/data/connection';


import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import authRequests from '../helpers/data/authRequests';

import './App.scss';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const {
      authed,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!authed) {
      return (
       <div className="App">
        <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
        <div className="row">
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      </div>
      );
    }

    return (
      <div className="App">
        <MyNavbar isAuthed={ authed } logoutClickEvent={logoutClickEvent} />
        <h1>You are Authenticated!</h1>
      </div>
    );
  }
}

export default App;
