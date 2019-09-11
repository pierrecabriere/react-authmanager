import HOCManager from "hoc-manager";
import React from "react";

export default instance => HOCManager.create(Component => {
  return class WithAuth extends React.Component {
    props: any;
    unsubscribe;
    state = {};

    componentWillMount() {
      this.unsubscribe = instance.store.subscribe(() => {
        const { auth } = instance.store.getState();
        if (JSON.stringify(this.state) !== JSON.stringify(auth)) {
          // @ts-ignore
          this.setState(auth);
        }
      });
    }

    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    }

    render() {
      const { auth } = instance.store.getState();
      return <Component { ...this.props } auth={ auth } login={ data => instance.login(data) } logout={ () => instance.logout() } />;
    }
  }
}, {
  acceptParameters: false
})
