'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hocManager = require('hoc-manager');

var _hocManager2 = _interopRequireDefault(_hocManager);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _hocManager2.default.create((Component, parameters) => {

  class WithGuard extends _react2.default.Component {
    render() {
      const { user } = this.props;
      const next = () => _react2.default.createElement(Component, this.props);

      let guard = parameters[0];
      if ('string' === typeof guard) guard = _config2.default.guards[guard];

      return guard(user, next, this.props) || null;
    }
  }

  return WithGuard;
}, {
  acceptParameters: true
});