import HOCManager from "hoc-manager";
import React from "react";

export default instance => HOCManager.create((Component, parameters) => {
  return class WithGuard extends React.Component {
    props: any;
    unsubscribe;
    state = {};

    componentDidMount() {
      this.unsubscribe = instance.store.subscribe(() => {
        const { user } = instance.store.getState();
        if (JSON.stringify(this.state) != JSON.stringify(user)) {
          // @ts-ignore
          this.setState(user);
        }
      });
    }

    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    }

    render() {
      const { user } = instance.store.getState();
      const next: Function = (nextProps = {}) => <Component user={ user } { ...this.props } { ...nextProps } />;

      let guard = parameters[0];
      if ('string' === typeof guard) {
        guard = instance.getGuard(guard);
      }

      const render = guard(user, this.props, next);

      return React.isValidElement(render) ? render : "Guard must return a valid react component";
    }
  }
}, {
  acceptParameters: true
})
