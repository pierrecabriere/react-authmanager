import React from 'react';

import HOCManager from '../lib/hoc-manager';

export default HOCManager.create((Component, parameters) => {

  class WithGuard extends React.Component {
    render() {
      const { user } = this.props;
      const next = () =>  <Component { ...this.props } />;

      const guard = parameters[0];
      return guard(user, next, this.props) || null;
    }
  }

  return WithGuard;

}, {
  acceptParameters: true,
})
