class HOCManager {
  // Gets the display name of a JSX component for dev tools
  getComponentDisplayName(Component) {
    return Component.displayName || Component.name || 'Unknown';
  }

  getOpts = opts => {
    return Object.assign({
      acceptParameters: false,
    }, opts);
  }

  create(getComponent, opts) {
    opts = this.getOpts(opts);

    return function (...parameters) {
      if (!opts.acceptParameters) {
        const ComposedComponent = parameters[0];
        return getComponent(ComposedComponent, {});
      }

      return ComposedComponent => getComponent(ComposedComponent, parameters);
    }
  }
}

export default new HOCManager();