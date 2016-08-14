import React, { Component, PropTypes } from 'react';
import { clearToken } from 'app/api/auth_token';

export default class HomeContainer extends Component {

  static propTypes = {
    authenticationError: PropTypes.object
  }

  logOut () {
    clearToken();
    window.location = '/';
  }

  render () {
    return (
      <div>
        <div>Home!</div>
        <div onClick={this.logOut.bind(this)}>Log out</div>
      </div>
    );
  }

}
