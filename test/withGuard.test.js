import React from 'react';
import Authmanager, { withGuard } from '../';
import { shallow } from 'enzyme';

const getGuardWithUser = newUser => (user, next) => {
  if (newUser)
    user = newUser;

  if (user.loading)
    return <div>loading</div>;

  if (user.logged)
    return next();

  return <div>login</div>;
}

const getComponentWithUser = (newUser, guardName = null) => {
  const guard = guardName || getGuardWithUser(newUser);

  class Component extends React.Component {
    render = () => this.props.injectedProp || 'component';
  }

  const ComponentWithGuard = withGuard(guard)(Component);

  return shallow(<ComponentWithGuard />);
}

describe('withGuard HOC with not logged user', () => {

  let component;

  beforeEach(() => {
    component = getComponentWithUser({
      loading: false,
      logged: false,
      fullname: 'John Doe',
      email: 'john@example.com'
    });
  })

  it('should render login', async done => {
    expect(component.text()).toBe('login');
    done();
  });

});

describe('withGuard HOC with not logged and loading user', () => {

  let component;

  beforeEach(() => {
    component = getComponentWithUser({ loading: true, logged: false, fullname: 'John Doe', email: 'john@example.com' });
  })

  it('should render loading', async done => {
    expect(component.text()).toBe('loading');
    done();
  });

});

describe('withGuard HOC with logged and loading user', () => {

  let component;

  beforeEach(() => {
    component = getComponentWithUser({ loading: true, logged: true, fullname: 'John Doe', email: 'john@example.com' });
  })

  it('should render loading', async done => {
    component.update();
    expect(component.text()).toBe('loading');
    done();
  });

});

describe('withGuard HOC with logged user', () => {

  let component;

  beforeEach(() => {
    component = getComponentWithUser({ loading: false, logged: true, fullname: 'John Doe', email: 'john@example.com' });
  })

  it('should render component', async done => {
    component = component.dive();
    component.update();
    expect(component.text()).toBe('component');
    done();
  });

});

describe('withGuard HOC with external guard configuration', () => {

  Authmanager.utils.createGuard('externalGuard', (user, next) => {
    user = { loading: false, logged: true, fullname: 'John Doe', email: 'john@example.com' };

    if (user.loading)
      return <div>loading</div>;

    if (user.logged)
      return next();

    return <div>login</div>;
  });

  let component;

  beforeEach(() => {
    component = getComponentWithUser(null, 'externalGuard');
  })

  it('should render component', async done => {
    component = component.dive();
    component.update();
    expect(component.text()).toBe('component');
    done();
  });

});

describe('withGuard HOC with external guard configuration that injects a prop', () => {

  Authmanager.utils.createGuard('externalGuardthatInjects', (user, next) => {
    user = { loading: false, logged: true, fullname: 'John Doe', email: 'john@example.com' };

    if (user.loading)
      return <div>loading</div>;

    if (user.logged)
      return next({ injectedProp: 'injected' });

    return <div>login</div>;
  });

  let component;

  beforeEach(() => {
    component = getComponentWithUser(null, 'externalGuardthatInjects');
  })

  it('should render component', async done => {
    component = component.dive();
    component.update();
    expect(component.text()).toBe('injected');
    done();
  });

});