'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dedupe = require('classnames/dedupe');

var _dedupe2 = _interopRequireDefault(_dedupe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_Component) {
    _inherits(Row, _Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
    }

    _createClass(Row, [{
        key: 'renderRequiredSymbol',
        value: function renderRequiredSymbol() {
            if (this.props.required === false) {
                return null;
            }
            return _react2.default.createElement(
                'span',
                { className: 'required-symbol' },
                ' *'
            );
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel() {
            var _props = this.props;
            var layout = _props.layout;
            var label = _props.label;
            var htmlFor = _props.htmlFor;
            var labelClassName = _props.labelClassName;
            var fakeLabel = _props.fakeLabel;
            var required = _props.required;


            if (layout === 'elementOnly') {
                return null;
            }

            var labelClassNames = [];
            labelClassNames.push('control-label');

            if (layout === 'horizontal') {
                labelClassNames.push('col-sm-3');
            }

            labelClassNames.push(labelClassName);

            if (fakeLabel) {
                return _react2.default.createElement(
                    'div',
                    {
                        className: (0, _dedupe2.default)(labelClassNames),
                        'data-required': required
                    },
                    _react2.default.createElement(
                        'strong',
                        null,
                        label,
                        this.renderRequiredSymbol()
                    )
                );
            }

            return _react2.default.createElement(
                'label',
                {
                    className: (0, _dedupe2.default)(labelClassNames),
                    'data-required': required,
                    htmlFor: htmlFor
                },
                label,
                this.renderRequiredSymbol()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var elementWrapperClassName = _props2.elementWrapperClassName;
            var rowClassName = _props2.rowClassName;
            var showErrors = _props2.showErrors;
            var layout = _props2.layout;


            var element = this.props.children;

            if (layout === 'elementOnly') {
                return _react2.default.createElement(
                    'span',
                    null,
                    element
                );
            }

            var cssClasses = {
                row: ['form-group'],
                elementWrapper: []
            };

            if (showErrors) {
                cssClasses.row.push('has-error');
                cssClasses.row.push('has-feedback');
            }

            if (layout === 'horizontal') {

                // Horizontal layout needs a 'row' class for Bootstrap 4
                cssClasses.row.push('row');

                cssClasses.elementWrapper.push('col-sm-9');
                cssClasses.elementWrapper.push(elementWrapperClassName);

                element = _react2.default.createElement(
                    'div',
                    { className: (0, _dedupe2.default)(cssClasses.elementWrapper) },
                    element
                );
            }

            cssClasses.row.push(rowClassName);
            return _react2.default.createElement(
                'div',
                { className: (0, _dedupe2.default)(cssClasses.row) },
                this.renderLabel(),
                element
            );
        }
    }]);

    return Row;
}(_react.Component);

Row.propTypes = {
    children: _react.PropTypes.node,
    elementWrapperClassName: _react2.default.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array, _react.PropTypes.object]),
    fakeLabel: _react.PropTypes.bool,
    htmlFor: _react.PropTypes.string,
    label: _react.PropTypes.node,
    labelClassName: _react2.default.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array, _react.PropTypes.object]),
    layout: _react.PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
    required: _react.PropTypes.bool,
    rowClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array, _react.PropTypes.object]),
    showErrors: _react.PropTypes.bool
};

Row.defaultProps = {
    label: '',
    rowClassName: '',
    labelClassName: '',
    elementWrapperClassName: '',
    required: false,
    showErrors: false,
    fakeLabel: false
};

exports.default = Row;