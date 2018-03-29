# React authentication manager 🔑

[![NPM version](https://img.shields.io/npm/v/react-authmanager.svg)](https://www.npmjs.com/package/react-authmanager)
[![Build Status](https://travis-ci.org/pierrecabriere/react-authmanager.svg?branch=master)](https://travis-ci.org/pierrecabriere/react-authmanager)
[![codecov](https://codecov.io/gh/pierrecabriere/react-authmanager/branch/master/graph/badge.svg)](https://codecov.io/gh/pierrecabriere/react-authmanager)

**react-authmanager is a highly-configurable toolkit for react. It manages users authentication with JWT in your app and provides guards HOCs to secure components in a flexible and simple way.**

---

- [Getting started](#1---getting-started)
- [Authenticate users](#2---authenticate-users)
- [Access user informations](#3---access-user-informations)
- [Secure components](#4---secure-components)
- [Authmanager](#5---authmanager)
    - [Authmanager.config](#51---authmanagerconfig)
    - [Authmanager.utils](#52---authmanagerutils)

## 1 - Getting started
`npm install --save react-authmanager`, then you have to configure some points.<br/>
To manage configuration, you need to import the Authmanager from the toolkit and change its default configuration.
You need to configure before starting to use the toolkit, so your highest component file is the best place (by example, it's the `App.js` file with a [create-react-app](https://github.com/facebook/create-react-app) instance !)
```js
import Authmanager from 'react-authmanager';

// will change the way how the toolkit will login the user and get a token back, see below
Authmanager.config.getToken = function(credentials) {}
```

**react-authmanager** needs:
- to know how to login the user from the server and get a token back ([`config.getToken`](#configgettokencredentials-async))
- to know how to get the current logged user informations from the server ([`config.getUser`](#configgetuser-async))

**you** will need:
- to include the current token in your requests headers authorization ([`utils.getToken`](#utilsgettoken))

### Minimal configuration for the toolkit
```js
import Authmanager from 'react-authmanager';

// how to login the user from the server and get a token back
Authmanager.config.getToken = async credentials => {
  ... // login user with an ajax call to the server and get a token back
  return token;
}

// how to get the current logged user informations from the server
Authmanager.config.getUser = async () => {
  ... // get current logged user informations from the server with an ajax call
  return user;
}
```

### Authorize your requests to get the logged user from the server
```js
// include the current token in your requests headers authorization
fetch(..., {
  headers: new Headers({
    'Authorization': Authmanager.utils.getToken() // returns null if no token is stored
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
import { withAuth } from 'react-authmanager';

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

export default withAuth(LoginComponent);

...

class LogoutComponent extends React.Component {
  handleClick() {
    this.props.logout()
      .then(function() { alert('Good bye !') })
  }
  
  ...
}

export default withAuth(LogoutComponent);
```

## 3 - Access user informations
**withUser** HOC will automatically inject an user object in your component props.<br/>
This object contains informations about the current user:

| prop       | default | description                                                                                             |
|:-----------|:--------|:--------------------------------------------------------------------------------------------------------|
| user:      |         | `object` containing current user informations                                                           |
| -- loading | false   | `bool` is user currently loaded from the server                                                         |
| -- logged  | false   | `bool` is the current user logged in (setted by [`config.isUserLogged`](#configisuserloggeduser-async)) |
| -- ...     | null    | `any` informations about the user sent by the server (setted by [`config.getUser`](#configgetuser-async))    |

```js
import { withUser } from 'react-authmanager';

class MyComponent extends React.Component {
  handleClick() {
    if (this.props.user.logged)
      alert('Hello ' + this.props.user.name);
    else
      alert('Hello John, please login !');
  }
  
  ...
}

export default withUser(MyComponent);
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
import { withGuard } from 'react-authmanager';

const loggedGuard = function(user, next) {
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

export default withGuard(loggedGuard)(MyComponent);
```

You can inject data in your rendered component props through the next function
```js
const guardThatInjects = function(user, next) {
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

export default withGuard(loggedGuard)(MyComponent);
```

You can also configure you guards from outside the component file with the [`utils.createGuard`](#utilscreateguardguard) Authmanager function :

```js
Authmanager.utils.createGuard('loggedGuard', function(user, next) {
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

export default withGuard('loggedGuard')(MyComponent);
```

## 5 - Authmanager

### 5.1 - `Authmanager.config`
To edit default configuration of **react-authmanager**, you have to import the `Authmanager` and override the config object:
```js
import Authmanager from 'react-authmanager';

// will change the way how the toolkit will login the user and get a token back, see below
Authmanager.config.getToken = function(credentials) {}
```

#### `config.getToken([credentials]) [async]`
Get an authentication token when an user tries to login. `getToken` is called when the auth login function is executed to store the token in *localStorage*.

**Parameters**
- [`credentials`] *(`Object`)* Arguments passed by the login function.

**Return *(`String`)***
```
Need to return a token that will be stored
```

**default**
```js
getToken = null;
```

**example with axios**
```js
Authmanager.config.getToken = async credentials => {
  const { data } = await axios.post('https://example.com/login', credentials);
  return data.token;
}
```

#### `config.getUser() [async]`
Get the current authenticated user. `getUser` is called when the toolkit initialize its store and after an user login.

**Return *(`Object`)***
```
Need to return informations about the current logged user
```

**default**
```js
getUser = null;
```

**example with axios**
```js
Authmanager.config.getUser = async () => {
 const { data } = await axios.get('https://example.com/user');
 return data;
}
```

#### `config.isUserLogged([user]) [async]`
Define if the current user (returned by `getUser`) is logged. `isUserLogged` is called after each user state change. The result is set in `user.logged`.

**Parameters**
- [`user`] *(`Object`)* Object returned by the `getUser` function.

**Return *(`Boolean`)***
```
Need to return a boolean that tell if the current user (returned by `getUser`) is logged.
```

**default**
```js
isUserLogged = user => null !== user;
```
*By default, `isUserLogged` returns true if `getUser` returns something different than null*

**example with axios**
```js
Authmanager.config.getUser = async () => {
 const { data } = await axios.get('https://example.com/user');
 return data;
}
```

### 5.2 - `Authmanager.utils`
**react-authmanager** also provides some utilities by the `Authmanager` to manage the toolkit from your app:
```js
import Authmanager from 'react-authmanager';

// will return the current stored token, or null, see below
const Authmanager.utils.getToken()
```

#### `utils.getToken()`
Returns the current stored token (in *localStorage*). You should use `getToken` to authorize your requests to the server

**Return *(`String`)***
```
Returns the token stored after the config.getToken call
```

**example with axios**
```js
axios.defaults.transformRequest.push((data, headers) => {
  const token = Authmanager.utils.getToken();
  if (token) headers.common['Authorization'] = token;

  return data;
});
```

#### `utils.setToken([token])`
Manually set a token. You can call the `setToken` if you want to implements your own login function.

**Parameters**
- [`token`] *(`String`)* String token that will be returned by the `getToken` function.

**Return *utils (`Object`)***
```
Need to return a boolean that tell if the current user (returned by `getUser`) is logged.
```

**example**
```js
Authmanager.utils.setToken('aValidToken');
Authmanager.utils.fetchUser();
```

#### `utils.createGuard([guard])`
Create a guard at the toolkit level, you will be able to reuse the guard just by giving its name

**Parameters**
- [`guard`] *(`Function`)* A function that returns a component or call the next function to render the default component.

**Return *Component | next()***
```
Need to return a valid React component or call the next function given in parameters.
```

**example**
```js
Authmanager.utils.createGuard('loggedGuard', (user, next) => {
  if (user.loading)
    return <div>loading</div>;
    
  if (user.logged)
    return next();
    
  return <div>login</div>;
});
```



#### `utils.getStore()`
Returns the redux store of the toolkit. You should not have to use this function

**Return *(`Object`)***
```
Returns the redux store object, containing the current state of the toolkit (user, auth, etc.)
```

#### `utils.fetchUser()`
Call the `getUser` function and update the redux store. You can use this function to refresh the current logged user from the server

**Return *utils (`Object`)***
```
Returns the Authmanager.utils object
```

---

🚀