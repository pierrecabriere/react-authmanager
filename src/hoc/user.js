import React from 'react';
import { connect } from 'react-redux';
import HOCManager from 'hoc-manager';

import Authmanager from '../';

export default HOCManager.create(Component => {

  const ConnectedComponent = connect(
    state => ({ user: state.user })
  )(Component);

  class WithUser extends React.Component {
    render() {
      return <ConnectedComponent { ...this.props } store={ this.props.store || Authmanager.utils.getStore() } />
    }
  }

  return WithUser

}, {
  acceptParameters: false,
})
