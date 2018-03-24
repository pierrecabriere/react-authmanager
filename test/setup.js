import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Authmanager from '../';

// jest.useFakeTimers();

Enzyme.configure({ adapter: new Adapter() });

Authmanager.config.getToken = async (credentials) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return credentials;
}