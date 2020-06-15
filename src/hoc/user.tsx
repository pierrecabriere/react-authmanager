import HOCManager from "hoc-manager";
import React from "react";

export default instance => HOCManager.create(Component => {
  return class WithUser extends React.Component {
    props: any;
    unsubscribe;
    state = {};

    setState: Function;

    constructor(props) {
      super(props);

      this.unsubscribe = instance.store.subscribe(() => {
        const { user } = instance.store.getState();
        if (JSON.stringify(this.state) != JSON.stringify(user)) {
          this.setState(user);
        }
      });
    }

    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    }

    render() {
      const { user } = instance.store.getState();
      return <Component { ...this.props } { ...user } __user={user} />
    }
  }
}, {
  acceptParameters: false
})
