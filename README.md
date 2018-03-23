# React auth manager 🔑

[![NPM version](https://img.shields.io/npm/v/react-authmanager.svg)](https://www.npmjs.com/package/react-authmanager)
[![Build Status](https://travis-ci.org/pierrecabriere/react-authmanager.svg?branch=master)](https://travis-ci.org/pierrecabriere/react-authmanager)

**react-authmanager is a highly-configurable toolkit for react. It manages users authentication with JWT in your app and provides guards HOCs to secure components in a flexible and simple way.**

> Documentation is not complete

---

- [1 - Installation](#1---installation)
- [2 - Authenticate users](#2---authenticate-users)
    - [2.1 - Usage](#21---usage)
- [3 - Access users](#3---access-users)
    - [3.1 - Usage](#31---usage)
- [4 - Secure components](#4---secure-components)
    - [4.1 - Usage](#41---usage)

# 1 - Installation
```
yarn add react-authmanager
```

# 2 - Authenticate users

## 2.1 - Usage
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

## 3.1 - Usage
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

## 4.1 - Usage
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