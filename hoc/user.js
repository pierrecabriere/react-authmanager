'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _hocManager = require('hoc-manager');

var _hocManager2 = _interopRequireDefault(_hocManager);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = _hocManager2.default.create(function (Component) {

  var ConnectedComponent = (0, _reactRedux.connect)(function (state) {
    return { user: state.user };
  })(Component);

  var WithUser = function (_React$Component) {
    _inherits(WithUser, _React$Component);

    function WithUser() {
      _classCallCheck(this, WithUser);

      return _possibleConstructorReturn(this, (WithUser.__proto__ || Object.getPrototypeOf(WithUser)).apply(this, arguments));
    }

    _createClass(WithUser, [{
      key: 'render',
      value: function render() {
        var props = this.props;
        return _react2.default.createElement(ConnectedComponent, _extends({}, props, { store: props.store || _2.default.utils.getStore() }));
      }
    }]);

    return WithUser;
  }(_react2.default.Component);

  return WithUser;
}, {
  acceptParameters: false
});