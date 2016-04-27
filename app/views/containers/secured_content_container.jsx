import React, { Component }  from 'react';
import { isTokenSet } from 'app/api/auth_token';

class SecuredContentContainer extends Component {

  componentWillMount() {
    if (!isTokenSet()) {
      this.props.history.pushState(null, '/login');
    }
  }

  render() {
    return this.props.children;
  }
}

SecuredContentContainer.propTypes = {
  history: React.PropTypes.shape({
    pushState: React.PropTypes.func
  }),
  children: React.PropTypes.node.isRequired
};

export default SecuredContentContainer;
