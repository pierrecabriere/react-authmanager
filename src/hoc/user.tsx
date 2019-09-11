import HOCManager from "hoc-manager";
import React from "react";

export default instance => HOCManager.create(Component => {
  return class WithUser extends React.Component {
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
      return <Component { ...this.props } user={ user } />
    }
  }
}, {
  acceptParameters: false
})
