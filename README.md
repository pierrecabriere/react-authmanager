# React auth manager 🔑

[![NPM version](https://img.shields.io/npm/v/react-authmanager.svg)](https://www.npmjs.com/package/react-authmanager)
[![Build Status](https://travis-ci.org/pierrecabriere/react-authmanager.svg?branch=master)](https://travis-ci.org/pierrecabriere/react-authmanager)

**react-authmanager is a highly-configurable toolkit for react. It manages users authentication with JWT in your app and provides guards HOCs to secure components in a flexible and simple way.**

---

- [Installation](#1---installation)
- [Minimal configuration](#2---minimal-configuration)
- [Authenticate users](#3---authenticate-users)
- [Access users](#4---access-users)
- [Secure components](#5---secure-components)
- [Advanced configuration](#6---advanced-configuration)

# 1 - Installation
```
yarn add react-authmanager
```

# 2 - Minimal configuration

To properly work, **react-authmanager** needs to know how to get the current user from the server and how to get the token from the login response.<br/>
The simplest way to configure the manager is to import it and change its config object.<br/>
You need to define the configuration before starting to use the toolkit, so the best place to configure the manager is the `index.js` or `App.js` file.

**example with axios**
```js
import axios from 'axios'
import Authmanager from 'react-authmanager';

// credentials is an object that you will define later (see the next section below on how to authenticate users)
Authmanager.config.getToken = async credentials => {
  const { data } = await axios.post('https://example.com/login', credentials);
  return data.token;
}

Authmanager.config.getUser = async () => {
  const { data } = await axios.get('https://example.com/user');
  return data;
}
```

In addition, you will need to inject the token in the Authorization headers of each request made.<br/>
To get the stored token, you can call `Authmanager.utils.getToken()`<br/>

**example with axios**
```js
import axios from 'axios'
import Authmanager from 'react-authmanager';

axios.defaults.transformRequest.push((data, headers) => {
  const token = Authmanager.utils.getToken(); // returns null if no token is stored
  if (token)
    headers.common['Authorization'] = `Bearer ${token}`;

  return data;
});
```

*For more configurations, please read the [advanced configuration](#6---advanced-configuration) section below.*

# 3 - Authenticate users
**withAuth** HOC injects in your component helpers to manage authentication: **login**, **logout** and **auth**.<br/>
**login** and **logout** are functions to log users. **auth** is an object that contains a state of operations.<br/>

|            |       |                                                               |
|:-----------|:------|:--------------------------------------------------------------|
| **login**  |       | `function` send credentials to the server to get a token back |
| **logout** |       | `function` remove the stored token                            |
| **auth** : |       | `object` informations about the current state of operations   |
| -- loading | false | `bool` is authentication (login or logout) currently loading  |

```js
import { withAuth } from 'react-authmanager';

@withAuth
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

@withAuth
class LogoutComponent extends React.Component {
  handleClick() {
    this.props.logout()
      .then(function() { alert('Good bye !') })
  }
  
  ...
}
```

# 4 - Access users
**withUser** HOC will automatically inject an user object in your props component.<br/>
This object contains informations about the current user :<br/>

|            |       |                                                      |
|:-----------|:------|:-----------------------------------------------------|
| **user** : |       | `object` containing current user informations        |
| -- loading  | false | `bool` is user currently loaded from the server      |
| -- logged   | false | `bool` is user currently logged                      |
| -- ...      | null  | `any` informations about the user sent by the server |

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

# 5 - Secure components
**withGuard** HOC helps you protect your components in a flexible way. By example, you can render a login form instead of a component if no user is logged in.<br/>
It needs a guard as parameter. A guard is just a function that returns a component, so you can easily create your own guards.<br/>
A guard function has some parameters:<br/>

|           |                                                          |
|:----------|:---------------------------------------------------------|
| **user**  | `object` the current user object                         |
| **next**  | `function` a function that returns the current Component |
| **props** | `object` the current component props                     |

```js
import { withGuard } from 'react-authmanager';

const loggedGuard = function(user, next) {
  if (user.loading)
    return (<MyLoadingComponent />); // render a loading component if user is currently fetched from the server
  
  if (user.logged)
    return next(); // render the component if user is not loading and is logged
  
  return (<MyLoginComponent />); // render a login component by default (if user is fetched from the server but not logged)
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

# 6 - Advanced configuration

> More documentation to come

# 🚀