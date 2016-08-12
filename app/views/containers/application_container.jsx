import React               from "react";
import {connect}           from "react-redux";
import {initializeSession} from "app/action_creators/session_action_creator";
import {isTokenSet}        from "app/api/auth_token";

class ApplicationContainer extends React.Component {
  render () {
    return (
      <div>{this.props.children}</div>
    );
  }
}

/**
* Entry point for the whole App this includes secured and not secured content.
* Application gets composed by redux therefore we can access to all the redux
* sugar from here after.
*/
const select = (state) => ({
  isInitializingSession: state.application.isInitializingSession,
  sessionValid: state.application.sessionValid
});
export default connect(select)
