"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Config {
  constructor() {
    this.getToken = null;
    this.getUser = null;

    this.isUserLogged = async user => null !== user;

    this.guards = {};
  }

}

exports.default = new Config();