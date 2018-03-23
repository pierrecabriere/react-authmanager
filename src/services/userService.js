import config from '../config';

class UserService {
  fetch = async () => {
    return await config.getUser();
  }
}

export default new UserService();