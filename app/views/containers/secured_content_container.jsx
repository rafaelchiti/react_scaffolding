import React, { Component, PropTypes } from 'react';
import { isTokenSet } from 'app/api/auth_token';

export default class SecuredContentContainer extends Component {

  static propTypes = {
    children: PropTypes.node
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    if (!isTokenSet()) {
      this.context.router.push('/login');
    }
  }

  render () {
    return this.props.children;
  }

}
