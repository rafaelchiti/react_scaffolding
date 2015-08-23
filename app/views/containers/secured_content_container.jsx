import React, {Component} from "react";
import {isTokenSet}       from "app/api/auth_token";

export default class SecuredContentContainer extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const {router} = this.context;

    if (!isTokenSet()) {
      router.transitionTo("/login");
    }
  }

  render () {
    return this.props.children;
  }
}
