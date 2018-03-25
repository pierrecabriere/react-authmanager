import config from '../config';

class UserService {
  fetch = async () => await config.getUser();
}

export default new UserService();