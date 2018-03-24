import React from 'react';
import HOCManager from 'hoc-manager';
import config from '../config';

export default HOCManager.create((Component, parameters) => {

  class WithGuard extends React.Component {
    render() {
      const { user } = this.props;
      const next = value => <Component { ...this.props } guard={ value } />;

      let guard = parameters[0];
      if ('string' === typeof guard)
        guard = config.guards[guard];

      return guard(user, next, this.props) || null;
    }
  }

  return WithGuard;

}, {
  acceptParameters: true,
})
