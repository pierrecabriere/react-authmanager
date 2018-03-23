class Config {
  getToken = null;
  getUser = null;
  isUserLogged = user => null !== user;
  guards = {};
}

export default new Config()