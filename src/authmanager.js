import config from './config';
import utils from './utils';

class _Authmanager {
  static get config() {
    return config;
  }

  static get utils() {
    return config;
  }
}

export default new _Authmanager();