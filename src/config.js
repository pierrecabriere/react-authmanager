class Config {
  getToken = null;
  getUser = null;
  isUserLogged = async user => null !== user;
  guards = {};
}

export default new Config()