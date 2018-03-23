import config from './config';
import utils from './utils';

class ReactAuthGuard {
  config = config;
  utils = utils;
  _store = null;

  get store() {
    if (!this._store)
      this._store = utils.createStore();

    return this._store;
  }
}

export default new ReactAuthGuard();