# React authentication manager 🔑

[![NPM version](https://img.shields.io/npm/v/react-authmanager.svg)](https://www.npmjs.com/package/react-authmanager)

**react-authmanager is a highly-configurable toolkit for react. It manages users authentication with JWT in your app and provides guards HOCs to secure components in a flexible and simple way.**

---

- [Getting started](#1---getting-started)
- [Authenticate users](#2---authenticate-users)
- [Access user informations](#3---access-user-informations)
- [Secure components](#4---secure-components)
- [Authmanager](#5---authmanager)
    - [Authmanager.config](#51---authmanagerconfig)
    - [Authmanager.utils](#52---authmanager-utils)

## 1 - Getting started
`npm install --save react-authmanager`, then you have to configure the package.<br/>
To manage configuration, you need to import the default Authmanager.<br/>
You need to configure the toolkit before starting to use, so your highest component file is the best place (by example, it's the `App.js` file with a [create-react-app](https://github.com/facebook/create-react-app) instance !)
```js
import Authmanager from 'react-authmanager';

// will change the way how the toolkit will login the user and get a token back, see below
Authmanager.fetchToken = function(credentials) {}
```

You can also create a new toolkit instance.
```js
import Authmanager from 'react-authmanager';

const customManager = Authmanager.create("customName", { ...config });
```

**react-authmanager** needs:
- to know how to login the user from the server and get a token back ([`fetchToken`](#configfetchtokencredentials-async))
- to know how to get the current logged user informations from the server ([`fetchUser`](#configfetchuser-async))

**you** will need:
- to include the current token in your requests headers authorization ([`getToken`](#gettoken))

### Minimal configuration for the toolkit
```js
import Authmanager from 'react-authmanager';

// how to login the user from the server and get a token back
Authmanager.config.fetchToken = async credentials => {
  ... // login user with an ajax call to the server and return the given token
  return token;
}

// how to get the current logged user informations from the server
Authmanager.config.fetchUser = async () => {
  ... // get current logged user informations from the server with an ajax call and return any data you will need
  return user;
}
```

### Authorize your requests
```js
// include the current token in your requests headers authorization
fetch(..., {
  headers: new Headers({
    'Authorization': 'Bearer ' + Authmanager.getToken() // returns null if no token is stored
  }),
  ...
});
```

*For more configurations, please read the [Authmanager](#5---authmanager) section below.*

## 2 - Authenticate users
**withAuth** HOC injects in your component helpers to manage authentication: **login**, **logout** and **auth**.<br/>
**login** and **logout** are functions to log users. **auth** is an object that contains a state of operations.

| prop       | default | description                                                   |
|:-----------|:--------|:--------------------------------------------------------------|
| login      |         | `function` send credentials to the server to get a token back |
| logout     |         | `function` remove the stored token                            |
| auth:      |         | `object` informations about the current state of operations   |
| -- loading | false   | `bool` is authentication (login or logout) currently loading  |

```js
import Authmanager from 'react-authmanager';

class LoginComponent extends React.Component {
  handleSubmit() {
    const credentials = {
      email: 'hello@example.com',
      password: 'ThisIsASecret'
    }; // or whatever data you want to send to the server (see the getToken configuration in the Minimal configuration section above)
    
    this.props.login(credentials)
      .then(function() { alert('Hello !') })
  }
  
  render() {
    if (this.props.auth.loading)
      return (<MyLoadingComponent />);
    
    return ( ... );
  }
  
  ...
}

export default Authmanager.withAuth(LoginComponent); // or customManager.withAuth(LoginComponent);

...

class LogoutComponent extends React.Component {
  handleClick() {
    this.props.logout()
      .then(function() { alert('Good bye !') })
  }
  
  ...
}

export default Authmanager.withAuth(LogoutComponent); // or customManager.withAuth(LogoutComponent);
```

You can also call the login and logout methods anywhere on the toolkit with `Authmanager.login()` and `Authmanager.logout()`

## 3 - Access user informations
**withUser** HOC will automatically injects an user object in your component props.<br/>
This object contains informations about the current user:

| prop       | default | description                                                                                             |
|:-----------|:--------|:--------------------------------------------------------------------------------------------------------|
| user:      |         | `object` containing current user informations                                                           |
| -- loading | false   | `bool` is user currently loaded from the server                                                         |
| -- logged  | false   | `bool` is the current user logged in (setted by [`isUserLogged`](#configisuserloggeduser-async)) |
| -- ...     | null    | `any` informations about the user sent by the server (setted by [`getUser`](#configgetuser-async))    |

```js
import Authmanager from 'react-authmanager';

class MyComponent extends React.Component {
  handleClick() {
    if (this.props.user.logged)
      alert('Hello ' + this.props.user.name);
    else
      alert('Hello John, please login !');
  }
  
  ...
}

export default Authmanager.withUser(MyComponent);
```

## 4 - Secure components
**withGuard** HOC helps you protect your components in a flexible way. By example, you can render a login form instead of a component if no user is logged in.<br/>
It needs a guard as parameter. A guard is just a function that returns a component, so you can easily create your own guards.<br/>
A guard function has parameters:

| prop  | description                                              |
|:------|:---------------------------------------------------------|
| user  | `object` the current user object                         |
| next  | `function` a function that returns the current Component |
| props | `object` the current component props                     |

```js
import Authmanager from 'react-authmanager';

const loggedGuard = function(user, props, next) {
  if (user.loading)
    return (<MyLoadingComponent />); // render a loading component if user is currently fetched from the server
  
  if (user.logged)
    return next(); // render the component if user is not loading and is logged
  
  return (<MyLoginComponent />); // render a login component by default (if user is fetched from the server but not logged)
}

class MyComponent extends React.Component {
  render() {
    return (
      <div>This message is visible only for logged users !</div>
    )
  }
  
  ...
}

export default Authmanager.withGuard(loggedGuard)(MyComponent);
```

You can inject data in your rendered component props through the next function
```js
const guardThatInjects = function(user, props, next) {
    return next({ myNewProp: true });
}

class MyComponent extends React.Component {
  render() {
    console.log(this.props.myNewProp); // true
    return (
      <div>This message is visible only for logged users !</div>
    )
  }

  ...
}

export default Authmanager.withGuard(loggedGuard)(MyComponent);
```

You can also configure you guards from outside the component file with the [`addGuard`](#addguard) Authmanager function :

```js
Authmanager.addGuard('loggedGuard', function(user, props, next) {
  if (user.loading)
    return (<MyLoadingComponent />); // render a loading component if user is currently fetched from the server
    
  if (user.logged)
    return next(); // render the component if user is not loading and is logged
    
  return (<MyLoginComponent />); // render a login component by default (if user is fetched from the server but not logged)
});

...

class MyComponent extends React.Component {
  render() {
    return (
      <div>This message is visible only for logged users !</div>
    )
  }
  
  ...
}

export default Authmanager.withGuard('loggedGuard')(MyComponent);
```

## 5 - Authmanager

### 5.1 - `Authmanager.config`
To edit the configuration of **react-authmanager**your toolkit, you have to override the config object:
```js
import Authmanager from 'react-authmanager';

// will change the way how the toolkit will login the user and get a token back, see below
Authmanager.fetchToken = function(credentials) {}
```

```typescript
interface IReactAuthConfig {
  fetchToken?: Function,
  fetchUser?: Function,
  isUserLogged?: Function
}
```

#### `fetchToken([credentials]) [async]`
Get an authentication token when an user tries to login. `fetchToken` is called when the auth login function is executed to store the token in *localStorage*.

**Parameters**
- [`credentials`] *(`Object`)* Argument given by the login function. (when you call `Authmanager.login(credentials)`)

**Return *(`String`)***
```
Need to return a token that will be stored
```

**default**
```js
fetchToken = null;
```

**example with axios**
```js
Authmanager.fetchToken = async credentials => {
  const { data } = await axios.post('https://example.com/login', credentials);
  return data.token;
}
```

#### `fetchUser() [async]`
Get the current authenticated user. `fetchUser` is called when the toolkit initialize its store and after an user login.

**Return *(`Object`)***
```
Need to return informations about the current logged user
```

**default**
```js
fetchUser = null;
```

**example with axios**
```js
Authmanager.fetchUser = async () => {
 const { data } = await axios.get('https://example.com/current-user');
 return data;
}
```

#### `isUserLogged([user]) [async]`
Define if the current user (returned by `getUser`) is logged. `isUserLogged` is called after each user state change. The result is set in `user.logged`.

**Parameters**
- [`user`] *(`Object`)* Object returned by the `getUser` function.

**Return *(`Boolean`)***
```
Need to return a boolean that tell if the current user (returned by `getUser`) is logged.
```

**default**
```js
isUserLogged = userData => !!userData && Object.keys(userData).length > 0;
```
*By default, `isUserLogged` returns true if `fetchUser` returns a non-empty object*

### 5.2 - `Authmanager` utils
**react-authmanager** also provides some utilities to manage the toolkit from your app:
```js
import Authmanager from 'react-authmanager';

// will return the current stored token, or null, see below
const token = Authmanager.getToken()
```

#### `getToken()`
Returns the current stored token (in *localStorage*). You should use `getToken` to authorize your requests to the server

**Return *(`String`)***
```
Returns the token stored after the `fetchToken` call
```

**example with axios**
```js
axios.defaults.transformRequest.push((data, headers) => {
  const token = Authmanager.getToken();
  if (token) headers.common['Authorization'] = 'Bearer ' + token;

  return data;
});
```

#### `setToken([token])`
Manually set a token. You can call the `setToken` if you want to implements your own login function.

**Parameters**
- [`token`] *(`String`)* String token that will be returned by the `fetchToken` function.

**Return *utils (`Object`)***
```
Need to return a boolean that tell if the current user (returned by `getUser`) is logged.
```

**example**
```js
Authmanager.setToken('aValidToken');
Authmanager.getUser();
```

#### `addGuard([guard])`
Create a guard at the toolkit level, you will be able to reuse the guard just by giving its name

**Parameters**
- [`guard`] *(`Function`)* A function that returns a component or call the next function to render the default component.

**Return *Component | next()***
```
Need to return a valid React component or call the next function given in parameters.
```

**example**
```js
Authmanager.addGuard('loggedGuard', (user, next) => {
  if (user.loading)
    return <div>loading</div>;
    
  if (user.logged)
    return next();
    
  return <div>login</div>;
});
```

#### `getUser()`
Call the `fetchUser` function and update the redux store. You can use this function to refresh the current logged user from the server

**Return *utils (`Object`)***
```
Returns a promise that resolves the new user data
```

---

🚀
