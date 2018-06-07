import config from '../config';

class _UserService {
  fetch = async () => await config.getUser();
}

export default new _UserService();