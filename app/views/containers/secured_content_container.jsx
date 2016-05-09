import React, { Component }  from 'react';
import { browserHistory }   from 'react-router';
import { isTokenSet } from 'app/api/auth_token';

class SecuredContentContainer extends Component {

  componentWillMount() {
    if (!isTokenSet()) {
      browserHistory.push('/login');
    }
  }

  render() {
    return this.props.children;
  }
}

SecuredContentContainer.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default SecuredContentContainer;
