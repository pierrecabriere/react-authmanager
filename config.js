"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class _Config {

  constructor(config) {
    this.getToken = null;
    this.getUser = null;

    this.isUserLogged = (() => {
      var _ref = _asyncToGenerator(function* (user) {
        return null !== user;
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    })();

    this.guards = {};

    if (config.getToken) this.getToken = config.getToken;

    if (config.getUser) this.getUser = config.getUser;

    if (config.isUserLogged) this.isUserLogged = config.isUserLogged;

    if (config.guards) this.guards = config.guards;
  }
}

exports.default = _Config();