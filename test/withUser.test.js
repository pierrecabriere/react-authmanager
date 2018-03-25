import React from 'react';
import Authmanager from '../'
import withUser from '../withUser';
import { shallow } from 'enzyme';

class Component extends React.Component {
  render = () => null;
}
const ComponentWithUser = withUser(Component);

let component;

beforeEach(() => {
  component = shallow(<ComponentWithUser />).dive();
})

describe('withUser HOC', () => {

  it('should inject props', async done => {
    component.update();
    expect(component.props().user).toBeDefined;
    expect(component.props().user.loading).toBeDefined;
    expect(component.props().user.logged).toBeDefined;
    done();
  });

  it('should inject user informations in props', async done => {
    const unsubscribe = Authmanager.utils.getStore().subscribe(() => {
      component.update();
      if (false === component.props().user.loading) {
        expect(component.props().user.loading).toBe(false);
        expect(component.props().user.logged).toBe(true);
        expect(component.props().user.fullname).toBe('John Doe');
        unsubscribe();
        done();
      }
    });
  })

});