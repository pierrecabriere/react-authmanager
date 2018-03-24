import React from 'react';
import Authmanager from '../'
import withUser from '../withAuth';
import { shallow } from 'enzyme';

class Component extends React.Component {
  render = () => null;
}
const ComponentWithUser = withUser(Component);

let component;

beforeEach(() => {
  component = shallow(<ComponentWithUser test="toto" />).dive();
})

describe('withUser HOC', () => {

  it('should inject props', async done => {
    component.update();
    expect(component.props().user).toBeDefined;
    expect(component.props().user.loading).toBeDefined;
    expect(component.props().user.loading).toBe(false);
    expect(component.props().user.logged).toBeDefined;
    expect(component.props().user.logged).toBe(false);
    const unsubscribe = Authmanager.store.subscribe(() => {
      component.update();
      if (false === component.props().user.loading) {
        component.update();
        expect(component.props().user.loading).toBe(false);
        expect(component.props().user.logged).toBe(true);
        expect(component.props().user.fullname).toBe('John Doe');
        unsubscribe();
        done();
      }
    });
  });

});