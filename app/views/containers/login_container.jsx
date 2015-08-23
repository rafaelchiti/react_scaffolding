import React, {Component} from "react";
import _                  from "lodash";
import {connect}          from "react-redux";
import Login              from "app/views/auth/login";
import {authenticate}     from "app/action_creators/session_action_creator";
import {isTokenSet}       from "app/api/auth_token";


const select = (state) => ({
  authenticationError: state.session.authenticationError
});

/**
* This is the entry point for any page that requires a logged in user
*/
@connect(select)
export default class LoginContainer extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const {router} = this.context;

    if (isTokenSet()) {
      router.transitionTo("/home");
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
    const {router} = this.context;

    const {dispatch} = this.props;

    dispatch(authenticate(email, password)).then((result) => {
      if (result.apiError) return;

      router.transitionTo("/home");
    });
  }

}




