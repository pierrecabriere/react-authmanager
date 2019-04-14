class _Config {
  getToken = null;
  getUser = null;
  isUserLogged = async user => null !== user;
  guards = {};

  constructor(config) {
    if (config.getToken)
      this.getToken = config.getToken;

    if (config.getUser)
      this.getUser = config.getUser;

    if (config.isUserLogged)
      this.isUserLogged = config.isUserLogged;

    if (config.guards)
      this.guards = config.guards;
  }
}

export default _Config()