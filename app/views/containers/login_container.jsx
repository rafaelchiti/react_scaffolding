import React, {Component} from "react";
import _                  from "lodash";
import {connect}          from "react-redux";
import Login              from "app/views/auth/login";
import {authenticate}     from "app/action_creators/session_action_creator";
import {isTokenSet}       from "app/api/auth_token";

/**
* This is the entry point for any page that requires a logged in user
*/
class LoginContainer extends Component {

  componentWillMount() {
    if (isTokenSet()) {
      this.props.history.pushState(null, "/home");
    }
  }

  render () {
    return (
      <Login onSubmit={this._handleSubmit.bind(this)}
        authenticationError={this.props.authenticationError}
      />
    );
  }

  _handleSubmit ({email, password}) {
    const {dispatch} = this.props;

    dispatch(authenticate(email, password)).then((result) => {
      if (result.apiError) return;

      this.props.history.pushState(null, "/home");
    });
  }

}

const select = (state) => ({
  authenticationError: state.session.authenticationError
});
export default connect(select)
