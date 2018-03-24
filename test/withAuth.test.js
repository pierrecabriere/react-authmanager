import React from 'react';
import Authmanager from '../'
import withAuth from '../withAuth';
import { shallow } from 'enzyme';

class Component extends React.Component {
  render = () => null;
}

const ComponentWithAuth = withAuth(Component);
const ComponentShallow = shallow(<ComponentWithAuth />).first().shallow();
const props = ComponentShallow.props();

describe('withAuth HOC', () => {

  it('should inject props', done => {
    expect(props.login).toBeDefined;
    expect(props.logout).toBeDefined;
    expect(props.auth).toBeDefined;
    expect(props.auth.loading).toBe(false);
    done();
  });

  it('injected login prop should store a token', async done => {
    await props.login('test');
    const token = Authmanager.utils.getToken();
    expect(token).toBe('test');
    done();
  });

  it('injected logout prop should clear the token', async done => {
    await props.login('test');
    await props.logout();
    const token = Authmanager.utils.getToken();
    expect(null === token || "null" === token).toBe(true);
    done();
  });

});