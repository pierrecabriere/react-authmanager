import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HOCManager from '../lib/hoc-manager';
import * as userActions from '../actions/userActions';
import Authmanager from '../';

export default HOCManager.create(Component => {

  const ConnectedComponent = connect(
    null,
    dispatch => bindActionCreators({ ...userActions }, dispatch)
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
