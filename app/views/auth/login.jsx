import React, { Component, PropTypes } from 'react';
import classNames from './styles';

export default class Login extends Component {

  static propTypes = {
    authenticationError: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.onSubmit({ email: this.state.email, password: this.state.password });
  }

  handleEmailChange (event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange (event) {
    this.setState({ password: event.target.value });
  }

  renderAuthenticationErrors () {
    if (this.props.authenticationError) {
      return <div>{this.props.authenticationError.errorMessage}</div>;
    }
  }

  render () {
    return (
      <div className={classNames.loginContainer}>
        <h1>Enter your credentials</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>

          {this.renderAuthenticationErrors()}

          <input
            value={this.state.email}
            onChange={this.handleEmailChange.bind(this)}
            type="email" placeholder="Email"
          />

          <input
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
            type="password" placeholder="Password"
          />

          <div>
            <input type="submit" value="Login" />
          </div>

        </form>
      </div>
    );
  }

}
