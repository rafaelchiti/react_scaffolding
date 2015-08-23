import React, {Component} from "react";

export default class Login extends Component {

  constructor (props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  render () {
    return (
      <div>
        <h1>Enter your credentials</h1>
        <form onSubmit={this._handleSubmit.bind(this)}>

          <input value={this.state.email} onChange={this._handleEmailChange.bind(this)}
            type="email" placeholder="Email" />

          <input value={this.state.password} onChange={this._handlePasswordChange.bind(this)}
            type="password" placeholder="Password" />

          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }

  _handleSubmit (event) {
    event.preventDefault();
    this.props.onSubmit({email: this.state.email, password: this.state.password});
  }

  _handleEmailChange (event) {
    this.setState({email: event.target.value});
  }

  _handlePasswordChange (event) {
    this.setState({password: event.target.value});
  }

}


