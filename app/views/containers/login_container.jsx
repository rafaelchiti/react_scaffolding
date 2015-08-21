import React, {Component} from "react";
import _                  from "lodash";
import {connect}          from "react-redux";
import Login              from "app/views/auth/login";

const select = (state) => ({});

/**
* This is the entry point for any page that requires a logged in user
*/
@connect(select)
export default class LoginContainer extends Component {

  componentWillMount () {
    //const { dispatch, parent } = this.props;
    // dispatch(fetchStudents(parent._id));
  }

  render () {
    return <Login onSubmit={this._handleSubmit.bind(this)} />;
  }

  _handleSubmit (event) {
    const {email, password} = this.state;

    console.log("Submit: ", email, password);
  }

}




