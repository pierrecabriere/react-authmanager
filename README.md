# React auth manager 🔑

[![NPM version](https://img.shields.io/npm/v/react-authmanager.svg)](https://www.npmjs.com/package/react-authmanager)
[![Build Status](https://travis-ci.org/pierrecabriere/react-authmanager.svg?branch=master)](https://travis-ci.org/pierrecabriere/react-authmanager)

**react-authmanager is a highly-configurable toolkit for react. It manages users authentication with JWT in your app and provides guards HOCs to secure components in a flexible and simple way.**

> Documentation is not complete

---

- [1 - Installation](#1---installation)
- [2 - Authenticate users](#2---authenticate-users)
- [3 - Access users](#3---access-users)
- [4 - Secure components](#4---secure-components)

# 1 - Installation
```
yarn add react-authmanager
```

# 2 - Authenticate users
**withAuth** HOC injects in your component helpers to manage authentication: **login**, **logout** and **auth**.<br/>
**login** and **logout** are functions to log users. **auth** is an object that contains a state of operations.<br/>

| props      | default |                                                              |
|:-----------|:--------|:-------------------------------------------------------------|
| **login**  |         | function: send credentials to the server to get a token back |
| **logout** |         | function: remove the stored token                            |
| **auth** : |         | object: informations about the current state of operations   |
| - loading  | false   | bool: is authentication (login or logout) currently loading  |

```js
import { withAuth } from 'react-authmanager';

@withAuth
class LoginComponent extends React.Component {
  handleSubmit() {
    const credentials = {
      email: 'hello@example.com',
      password: 'ThisIsASecret'
    }; // or whatever data you want to send to the server
    
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

@withAuth
class LogoutComponent extends React.Component {
  handleClick() {
    this.props.logout()
      .then(function() { alert('Good bye !') })
  }
  
  ...
}
```

# 3 - Access users
**withUser** HOC will automatically inject an user object in your props component.<br/>
This object contains informations about the current user :<br/>

| props      | default |                                                     |
|:-----------|:--------|:----------------------------------------------------|
| **user** : |         | object: containing current user informations        |
| - loading  | false   | bool: is user currently loaded from the server      |
| - logged   | false   | bool: is user currently logged                      |
| - ...      | null    | any: informations about the user sent by the server |

```js
import { withUser } from 'react-authmanager';

@withUser
class MyComponent extends React.Component {
  handleClick() {
    if (this.props.user.logged)
      alert('Hello ' + this.props.user.name);
    else
      alert('Hello John, please login !');
  }
  
  ...
}
```

# 4 - Secure components
```js
import { withGuard } from 'react-authmanager';

const loggedGuard = function(user, next) {
  if (user.loading)
    return (<MyLoadingComponent />);
  
  if (user.logged)
    return next(); // render the component if user is not loading and is logged
  
  return (<MyLoginComponent />);
}

@withGuard(loggedGuard)
class MyComponent extends React.Component {
  render() {
    return (
      <div>This message is visible only for logged users !</div>
    )
  }
  
  ...
}
```

# 🚀