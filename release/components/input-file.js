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

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var File = function (_Component) {
    _inherits(File, _Component);

    function File(props) {
        _classCallCheck(this, File);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(File).call(this, props));

        _this.handleChange = function (event) {
            var target = event.currentTarget;
            var value = target.value;
            _this.setState({ fileList: target.files });
            _this.props.onSetValue(target.files);
            _this.props.onChange(_this.props.name, target.files, value);
        };

        _this.renderElement = function () {
            return _react2.default.createElement('input', _extends({
                ref: 'element'
            }, _this.props, {
                id: _this.props.id,
                type: 'file',
                label: null,
                onChange: _this.handleChange,
                disabled: _this.props.disabled
            }));
        };

        _this.state = {
            fileList: []
        };
        return _this;
    }

    _createClass(File, [{
        key: 'render',
        value: function render() {

            var element = this.renderElement();

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
        }
    }]);

    return File;
}(_react.Component);

File.propTypes = _extends({}, _utils.commonProps);

exports.default = File;