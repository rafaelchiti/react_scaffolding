import React, {Component} from "react";
import {isTokenSet}       from "app/api/auth_token";

export default class SecuredContentContainer extends Component {

  componentWillMount() {
    if (!isTokenSet()) {
      this.props.history.pushState(null, "/login");
    }
  }

  render () {
    return this.props.children;
  }
}
