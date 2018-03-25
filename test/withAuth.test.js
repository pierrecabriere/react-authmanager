import React from 'react';
import Authmanager from '../';
import withAuth from '../withAuth';
import { shallow } from 'enzyme';

class Component extends React.Component {
  render = () => null;
}

const ComponentWithAuth = withAuth(Component);

let component;

beforeEach(() => {
  component = shallow(<ComponentWithAuth />).dive();
})

describe('withAuth HOC', () => {

  it('should inject props', done => {
    component.update();
    expect(component.props().login).toBeDefined;
    expect(component.props().logout).toBeDefined;
    expect(component.props().auth).toBeDefined;
    expect(component.props().auth.loading).toBeDefined;
    expect(component.props().auth.loading).toBe(false);
    done();
  });

  it('injected login prop should store a token', async done => {
    component.update();
    await component.props().login('test');
    const token = Authmanager.utils.getToken();
    expect(token).toBe('test');
    done();
  });

  it('injected logout prop should clear the token', async done => {
    component.update();
    await component.props().login('test');
    await component.props().logout();
    const token = Authmanager.utils.getToken();
    expect(null === token || "null" === token).toBe(true);
    done();
  });

  it('injected login prop should set loading true', async done => {
    component.update();
    const unsubscribe = Authmanager.utils.getStore().subscribe(() => {
      component.update();
      expect(component.props().auth.loading).toBe(true);
      unsubscribe();
    });
    await component.props().login();
    component.update();
    expect(component.props().auth.loading).toBe(false);
    done();
  });

  it('injected logout prop should set loading true', async done => {
    component.update();
    const unsubscribe = Authmanager.utils.getStore().subscribe(() => {
      component.update();
      expect(component.props().auth.loading).toBe(true);
      unsubscribe();
    });
    await component.props().logout();
    component.update();
    expect(component.props().auth.loading).toBe(false);
    done();
  });

});