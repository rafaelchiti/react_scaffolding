import React, {Component} from "react";
import {isTokenSet}       from "app/api/auth_token";
import {hashHistory}      from "react-router";

export default class SecuredContentContainer extends Component {

  componentWillMount() {
    if (!isTokenSet()) {
      hashHistory.push("/login");
    }
  }

  render () {
    return this.props.children;
  }
}
