import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Login from 'app/views/auth/login';
import { authenticate } from 'app/action_creators/session_action_creator';
import { isTokenSet }  from 'app/api/auth_token';

/**
* This is the entry point for any page that requires a logged in user
*/
class LoginContainer extends Component {

  static propTypes = {
    authenticationError: PropTypes.object,
    dispatch: PropTypes.func
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    if (isTokenSet()) {
      this.context.router.push('/home');
    }
  }

  handleSubmit ({ email, password }) {
    const { dispatch } = this.props;

    dispatch(authenticate(email, password)).then((result) => {
      if (result.apiError) return;

      this.context.router.push('/home');
    });
  }

  render () {
    return (
      <Login
        onSubmit={this.handleSubmit.bind(this)}
        authenticationError={this.props.authenticationError}
      />
    );
  }


}

const mapStateToProps = (state) => ({
  authenticationError: state.session.authenticationError
});
export default connect(mapStateToProps)(LoginContainer);
