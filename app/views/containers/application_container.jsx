import React       from 'react';
import { connect } from 'react-redux';
//import { initializeSession } from 'app/action_creators/session_action_creator';
//import { isTokenSet }        from 'app/api/auth_token';

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
class ApplicationContainer extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

ApplicationContainer.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default ApplicationContainer;
