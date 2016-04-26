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

var CheckboxGroup = function (_Component) {
    _inherits(CheckboxGroup, _Component);

    function CheckboxGroup() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, CheckboxGroup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CheckboxGroup)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function () {
            var _this$props = _this.props;
            var options = _this$props.options;
            var name = _this$props.name;

            var checkedOptions = options.filter(function (option, key) {
                return _this.refs['element-' + key].checked;
            });
            var value = checkedOptions.map(function (option) {
                return option.value;
            });
            _this.props.onSetValue(value);
            _this.props.onChange(name, value);
        }, _this.renderElement = function () {
            var controls = _this.props.options.map(function (checkbox, key) {
                var checked = _this.props.value.indexOf(checkbox.value) !== -1;
                var disabled = checkbox.disabled || _this.props.disabled;
                return _react2.default.createElement(
                    'div',
                    { className: 'checkbox', key: key },
                    _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement('input', {
                            ref: 'element-' + key,
                            checked: checked,
                            type: 'checkbox',
                            value: checkbox.value,
                            onChange: _this.handleChange,
                            disabled: disabled
                        }),
                        ' ',
                        checkbox.label
                    )
                );
            });
            return controls;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // Returns an array of the values of all checked items.


    _createClass(CheckboxGroup, [{
        key: 'render',
        value: function render() {

            var element = this.renderElement();
            if (this.props.layout === 'elementOnly') {
                return _react2.default.createElement(
                    'div',
                    null,
                    element
                );
            }

            return _react2.default.createElement(
                _row2.default,
                _extends({}, this.props, {
                    fakeLabel: true
                }),
                element,
                this.props.help ? _react2.default.createElement(_help2.default, { help: this.props.help }) : null,
                this.props.showErrors ? _react2.default.createElement(_errorMessages2.default, { messages: this.props.errorMessages }) : null
            );
        }
    }]);

    return CheckboxGroup;
}(_react.Component);

CheckboxGroup.propTypes = _extends({}, _utils.commonProps, {
    options: _react.PropTypes.array.isRequired,
    value: _react.PropTypes.array
});

CheckboxGroup.defaultProps = {
    label: '',
    value: [],
    help: null
};

exports.default = CheckboxGroup;