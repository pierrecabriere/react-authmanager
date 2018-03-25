import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HOCManager from 'hoc-manager';
import * as authActions from '../actions/authActions';
import Authmanager from '../';

export default HOCManager.create(Component => {

  const propsActions = { login: authActions.login, logout: authActions.logout };

  const ConnectedComponent = connect(
    state => ({ auth: state.auth }),
    dispatch => bindActionCreators(propsActions, dispatch)
  )(Component);

  class WithAuth extends React.Component {
    render() {
      const props = this.props;
      return <ConnectedComponent { ...props } store={ props.store || Authmanager.utils.getStore() } />
    }
  }

  return WithAuth;

}, {
  acceptParameters: false,
})
