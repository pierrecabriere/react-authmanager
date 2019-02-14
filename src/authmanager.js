import config from './config';
import utils from './utils';

class _Authmanager {
  get config() {
    return config;
  }

  get utils() {
    return utils;
  }
}

export default new _Authmanager();