import config from '../config';
import utils from '../utils';

class AuthService {
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

export default new AuthService();