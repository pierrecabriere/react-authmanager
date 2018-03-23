import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HOCManager from 'hoc-manager';
import * as authActions from '../actions/authActions';
import Authmanager from '../';

export default HOCManager.create(Component => {

  const propsActions = { login: authActions.login, logout: authActions.logout };

  const ConnectedComponent = connect(
    state => state,
    dispatch => bindActionCreators(propsActions, dispatch)
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
