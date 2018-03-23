import React from 'react';
import HOCManager from '../lib/hoc-manager';
import { connect } from 'react-redux';
import Authmanager from '../';

export default HOCManager.create(Component => {

  const ConnectedComponent = connect(
    state => ({ user: state.user })
  )(Component);

  class WithUser extends React.Component {
    render() {
      const props = this.props;
      return <ConnectedComponent { ...props } store={Authmanager.store} />
    }
  }

  return WithUser

}, {
  acceptParameters: false,
})
