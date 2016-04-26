'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _errorMessages = require('./error-messages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Select);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Select)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (event) {
            var target = event.currentTarget;
            var value;
            if (_this.props.multiple) {
                value = [];
                for (var i = 0; i < target.length; i++) {
                    var option = target.options[i];
                    if (option.selected) {
                        value.push(option.value);
                    }
                }
            } else {
                value = target.value;
            }
            _this.props.onSetValue(value);
            _this.props.onChange(_this.props.name, value);
        }, _this.renderElement = function () {
            var optionNodes = _this.props.options.map(function (item, index) {
                return _react2.default.createElement(
                    'option',
                    _extends({ key: index }, item, { label: null }),
                    item.label
                );
            });
            return _react2.default.createElement(
                'select',
                _extends({
                    ref: 'element',
                    className: 'form-control'
                }, _this.props, {
                    id: _this.props.id,
                    value: _this.props.value,
                    onChange: _this.handleChange,
                    disabled: _this.props.disabled
                }),
                optionNodes
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Select, [{
        key: 'render',
        value: function render() {

            var element = this.renderElement();

            if (this.props.layout === 'elementOnly') {
                return element;
            }

            return _react2.default.createElement(
                _row2.default,
                _extends({}, this.props, {
                    htmlFor: this.props.id
                }),
                element,
                this.props.help ? _react2.default.createElement(_help2.default, { help: this.props.help }) : null,
                this.props.showErrors ? _react2.default.createElement(_errorMessages2.default, { messages: this.props.errorMessages }) : null
            );
        }
    }]);

    return Select;
}(_react.Component);

Select.propTypes = _extends({}, _utils.commonProps, {
    options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        value: _react.PropTypes.string,
        label: _react.PropTypes.string
    })).isRequired,
    multiple: _react.PropTypes.bool
});

exports.default = Select;