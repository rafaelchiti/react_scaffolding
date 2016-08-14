import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class ApplicationContainer extends React.Component {

  static propTypes = {
    children: PropTypes.element
  }

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
const mapStateToProps = (state) => ({
  isInitializingSession: state.application.isInitializingSession,
  sessionValid: state.application.sessionValid
});
export default connect(mapStateToProps)(ApplicationContainer);
