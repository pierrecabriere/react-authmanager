'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _hocManager = require('hoc-manager');

var _hocManager2 = _interopRequireDefault(_hocManager);

var _authActions = require('../actions/authActions');

var authActions = _interopRequireWildcard(_authActions);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _hocManager2.default.create(Component => {

  const ConnectedComponent = (0, _reactRedux.connect)(null, dispatch => (0, _redux.bindActionCreators)(_extends({}, authActions), dispatch))(Component);

  class WithAuth extends _react2.default.Component {
    render() {
      const props = this.props;
      return _react2.default.createElement(ConnectedComponent, _extends({}, props, { store: _2.default.store }));
    }
  }

  return WithAuth;
}, {
  acceptParameters: false
});