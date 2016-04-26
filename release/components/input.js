'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _errorMessages = require('./error-messages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Input);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Input)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (event) {
            var value = event.currentTarget.value;
            _this.props.onSetValue(value);
            _this.props.onChange(_this.props.name, value);
        }, _this.renderElement = function () {
            var className = 'form-control';
            if (['range'].indexOf(this.props.type) !== -1) {
                className = null;
            }
            return _react2.default.createElement('input', _extends({
                ref: 'element',
                className: className
            }, this.props, {
                id: this.props.id,
                label: null,
                value: this.props.value,
                onChange: this.handleChange
            }));
        }, _this.renderInputGroup = function (element) {
            return _react2.default.createElement(
                'div',
                { className: 'input-group' },
                this.renderAddon(this.props.addonBefore),
                this.renderButton(this.props.buttonBefore),
                element,
                this.renderAddon(this.props.addonAfter),
                this.renderButton(this.props.buttonAfter)
            );
        }, _this.renderAddon = function (addon) {
            if (!addon) {
                return false;
            }
            return _react2.default.createElement(
                'span',
                { className: 'input-group-addon' },
                addon
            );
        }, _this.renderButton = function (button) {
            if (!button) {
                return false;
            }
            return _react2.default.createElement(
                'span',
                { className: 'input-group-btn' },
                button
            );
        }, _this.render = function () {
            var element = this.renderElement();

            if (this.props.type === 'hidden') {
                return element;
            }

            if (this.props.addonBefore || this.props.addonAfter || this.props.buttonBefore || this.props.buttonAfter) {
                element = this.renderInputGroup(element);
            }

            if (this.props.layout === 'elementOnly') {
                return element;
            }

            var warningIcon = null;
            if (this.props.showErrors) {
                warningIcon = _react2.default.createElement(_icon2.default, { symbol: 'remove', className: 'form-control-feedback' });
            }

            return _react2.default.createElement(
                _row2.default,
                _extends({}, this.props, {
                    htmlFor: this.props.id
                }),
                element,
                warningIcon,
                this.props.help ? _react2.default.createElement(_help2.default, { help: this.props.help }) : null,
                this.props.showErrors ? _react2.default.createElement(_errorMessages2.default, { messages: this.props.errorMessages }) : null
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // TODO: split input group rendering out into another component


    return Input;
}(_react.Component);

Input.propTypes = _extends({}, _utils.commonProps, {
    addonAfter: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
    addonBefore: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
    buttonAfter: _react.PropTypes.node,
    buttonBefore: _react.PropTypes.node,
    type: _react.PropTypes.oneOf(['color', 'date', 'datetime', 'datetime-local', 'email', 'hidden', 'month', 'number', 'password', 'range', 'search', 'tel', 'text', 'time', 'url', 'week']),
    value: _react.PropTypes.string
});

Input.defaultProps = {
    type: 'text',
    value: '',
    addonBefore: null,
    addonAfter: null,
    buttonBefore: null,
    buttonAfter: null
};

exports.default = Input;