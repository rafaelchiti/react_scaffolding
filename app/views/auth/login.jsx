import React, {Component} from "react";

export default class Login extends Component {

  constructor (props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  componentWillMount () {
    const { dispatch, parent } = this.props;

    // dispatch(fetchStudents(parent._id));
  }

  render () {
    return (
      <div>
        <h1>Enter your credentials</h1>
        <form onSubmit={this.props.onSubmit}>

          <input value={this.state.email} onChange={this._handleEmailChange.bind(this)}
            type="email" placeholder="Email" />

          <input value={this.state.password} type="password"
            placeholder="Password" />

          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }

  _handleEmailChange (event) {
    this.setState({email: event.value});
  }

  _handlePasswordChange (event) {
    this.setState({email: event.value});
  }

}


