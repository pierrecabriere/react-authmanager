import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HOCManager from 'hoc-manager';
import * as authActions from '../actions/authActions';
import Authmanager from '../';

export default HOCManager.create(Component => {

  const ConnectedComponent = connect(
    null,
    dispatch => bindActionCreators(authActions, dispatch)
  )(Component);

  class WithAuth extends React.Component {
    render() {
      const props = this.props;
      return <ConnectedComponent {...props} store={Authmanager.store} />
    }
  }

  return WithAuth;

}, {
  acceptParameters: false,
})
