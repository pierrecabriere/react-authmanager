'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _hocManager = require('hoc-manager');

var _hocManager2 = _interopRequireDefault(_hocManager);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _hocManager2.default.create(Component => {

  const ConnectedComponent = (0, _reactRedux.connect)(state => ({ user: state.user }))(Component);

  class WithUser extends _react2.default.Component {
    render() {
      return _react2.default.createElement(ConnectedComponent, _extends({}, this.props, { store: this.props.store || _2.default.utils.getStore() }));
    }
  }

  return WithUser;
}, {
  acceptParameters: false
});