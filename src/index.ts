import * as authActions from "./actions/authActions";
import * as userActions from "./actions/userActions";
import AuthHOC from "./hoc/auth";
import GuardHOC from "./hoc/guard";
import UserHOC from "./hoc/user";
import store from "./store";

interface IReactAuthConfig {
  fetchToken?: Function,
  fetchUser?: Function,
  isUserLogged?: Function
}

class ReactAuth {
  private static jwtName = 'REACT-AUTH-JWT';
  private static defaultConfig: IReactAuthConfig = {
    fetchToken: () => null,
    fetchUser: () => null,
    isUserLogged: data => !!data && Object.keys(data).length > 0
  };

  private _guards = {};

  name: string;
  config: IReactAuthConfig;
  store: any;

  // hoc
  withAuth: Function;
  withUser: Function;
  withGuard: Function;

  constructor(name?: string, config?: IReactAuthConfig) {
    const { constructor: { defaultConfig } } = Object.getPrototypeOf(this);
    this.config = Object.assign({}, defaultConfig, config);
    this.name = name;
    this.store = store();
    this.withAuth = AuthHOC(this);
    this.withUser = UserHOC(this);
    this.withGuard = GuardHOC(this);

    return this;
  }

  create(name: string, config: IReactAuthConfig) {
    return new ReactAuth(name, config);
  }

  get jwtName() {
    const { constructor: { jwtName } } = Object.getPrototypeOf(this);
    return this.name ? `${ jwtName }_${ this.name }` : jwtName;
  }

  getToken() {
    return localStorage.getItem(this.jwtName);
  }

  setToken(token) {
    localStorage.setItem(this.jwtName, token);
    return this;
  }

  deleteToken() {
    localStorage.removeItem(this.jwtName);
    return this;
  }

  addGuard(name, fn) {
    Object.assign(this._guards, { [name]: fn })
  }

  getGuard(name) {
    return this._guards[name];
  }

  // helpers

  async login(data) {
    this.store.dispatch(authActions.loginStart());
    try {
      const token = await this.config.fetchToken(data);
      this.setToken(token);
      this.store.dispatch(authActions.loginEnd());
      return await this.getUser();
    } catch (e) {
      this.store.dispatch(authActions.loginEnd());
      throw e;
    }
  }

  logout() {
    this.store.dispatch(authActions.logoutStart());
    this.store.dispatch(userActions.reset());
    this.deleteToken();
    this.store.dispatch(authActions.logoutEnd());
    return true;
  }

  async getUser() {
    this.store.dispatch(userActions.fetchStart());
    let user;
    try {
      user = await this.config.fetchUser();
      const logged = await this.config.isUserLogged(user);
      this.store.dispatch(userActions.fetchSuccess({ user, logged }));
      this.store.dispatch(userActions.fetchEnd());
    } catch (e) {
      this.store.dispatch(userActions.fetchError());
      this.store.dispatch(userActions.fetchEnd());
      throw e;
    }
    return user;
  }
}

export default new ReactAuth();