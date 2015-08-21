import React               from "react";
import {connect}           from "react-redux";
import {initializeSession} from "app/action_creators/session_action_creator";

const select = (state) => ({
  isInitializingSession: state.application.isInitializingSession,
  sessionValid: state.application.sessionValid
});

/**
* Entry point for the whole App this includes secured and not secured content.
* Application gets composed by redux therefore we can access to all the redux
* sugar from here after.
*/
@connect(select)
export default class ApplicationContainer extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch} = this.props;

    dispatch(initializeSession());
  }

  componentWillUpdate(nextProps, nextState) {
    const noSessionFound = this.props.isInitializingSession && (!nextProps.isInitializingSession && !nextProps.sessionValid);

    if (noSessionFound) {
      this.context.router.transitionTo("/login");
    }
  }

  render () {
    let contents;

    if (this.props.sessionValid) {
      contents = this.props.children;
    } else {
      contents = "Loading...";
    }

    return (
      <div>{contents}</div>
    );
  }
}
