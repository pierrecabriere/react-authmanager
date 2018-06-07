import config from '../config';
import utils from '../utils';

class _AuthService {
  login = async credentials => {
    const token = await config.getToken(credentials);
    utils.setToken(token);
    return true;
  }

  logout = async () => {
    utils.deleteToken();
    return true;
  }
}

export default new _AuthService();