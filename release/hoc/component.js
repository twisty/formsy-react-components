'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FormsyReactComponent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// These are the types of props that we can convert to a HTML 'class' attribute value.
// See: https://github.com/JedWatson/classnames
var classNameType = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array, _react.PropTypes.object]);

// Component HOC
// -------------
//
// This mixin provides shared code for our form components.
//
// We also use this to merge props set using the ParentContextMixin, so that
// commonly used props can be set on an enclosing component.
//
// This allows us to set these properties 'as a whole' for each component in the
// the form, while retaining the ability to override the prop on a per-component
// basis.
var FormsyReactComponent = exports.FormsyReactComponent = function FormsyReactComponent(ComposedComponent) {
    var ComponentHOC = function (_Component) {
        _inherits(ComponentHOC, _Component);

        function ComponentHOC() {
            var _Object$getPrototypeO;

            var _temp, _this, _ret;

            _classCallCheck(this, ComponentHOC);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ComponentHOC)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.getLayout = function () {
                var defaultProperty = _this.context.layout || 'horizontal';
                return _this.props.layout ? _this.props.layout : defaultProperty;
            }, _this.getValidatePristine = function () {
                var defaultProperty = _this.context.validatePristine || false;
                return _this.props.validatePristine ? _this.props.validatePristine : defaultProperty;
            }, _this.getRowClassName = function () {
                return [_this.context.rowClassName, _this.props.rowClassName];
            }, _this.getLabelClassName = function () {
                return [_this.context.labelClassName, _this.props.labelClassName];
            }, _this.getElementWrapperClassName = function () {
                return [_this.context.elementWrapperClassName, _this.props.elementWrapperClassName];
            }, _this.getComponentProps = function () {
                return {
                    disabled: _this.props.isFormDisabled() || _this.props.disabled,
                    elementWrapperClassName: _this.getElementWrapperClassName(),
                    errorMessages: _this.props.getErrorMessages(),
                    id: _this.getId(),
                    labelClassName: _this.getLabelClassName(),
                    layout: _this.getLayout(),
                    required: _this.props.isRequired(),
                    rowClassName: _this.getRowClassName(),
                    showErrors: _this.shouldShowErrors(),
                    value: _this.props.getValue(),
                    onSetValue: _this.props.setValue
                };
            }, _this.getId = function () {
                var _this$props = _this.props;
                var id = _this$props.id;
                var label = _this$props.label;
                var name = _this$props.name;

                if (id !== '') {
                    return id;
                }
                return ['frc', name.split('[').join('_').replace(']', ''), _this.hashString(JSON.stringify(label))].join('-');
            }, _this.hashString = function (string) {
                var hash = 0;
                for (var i = 0; i < string.length; i++) {
                    hash = (hash << 5) - hash + string.charCodeAt(i) & 0xFFFFFFFF;
                }
                return hash;
            }, _this.shouldShowErrors = function () {
                if (_this.props.isPristine() === true) {
                    if (_this.getValidatePristine() === false) {
                        return false;
                    }
                }
                return _this.props.isValid() === false;
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        // The following methods are used to merge master default properties that
        // are optionally set on the parent form using the ParentContextMixin.


        // getId
        // -----
        //
        // The ID is used as an attribute on the form control, and is used to allow
        // associating the label element with the form control.
        //
        // If we don't explicitly pass an `id` prop, we generate one based on the
        // `name` and `label` properties.


        // Determine whether to show errors, or not.


        _createClass(ComponentHOC, [{
            key: 'render',


            // We pass through all props, but some are overwritten with `massaged`
            // versions to give our components what they expect.
            value: function render() {
                return _react2.default.createElement(ComposedComponent, _extends({}, this.props, this.getComponentProps()));
            }
        }]);

        return ComponentHOC;
    }(_react.Component);

    // These are the props that we require from the formsy-react HOC.
    // There are others, but as we don't use them, we don't need to define their PropTypes.


    var formsyPropTypes = {
        getErrorMessages: _react.PropTypes.func.isRequired,
        getValue: _react.PropTypes.func.isRequired,
        isFormDisabled: _react.PropTypes.func.isRequired,
        isPristine: _react.PropTypes.func.isRequired,
        isRequired: _react.PropTypes.func.isRequired,
        isValid: _react.PropTypes.func.isRequired,
        setValue: _react.PropTypes.func.isRequired
    };

    ComponentHOC.propTypes = _extends({}, formsyPropTypes, {

        name: _react.PropTypes.string.isRequired,
        disabled: _react.PropTypes.bool,
        elementWrapperClassName: classNameType,

        // Not used here, but composed components expect this to be a string.
        help: _react.PropTypes.string,

        id: _react.PropTypes.string,
        label: _react.PropTypes.string,
        labelClassName: classNameType,
        layout: _react.PropTypes.string,
        rowClassName: classNameType,
        validatePristine: _react.PropTypes.bool,

        // TODO: Not sure having these here this is a good idea.
        // These callbacks are not used here, but added because composed
        // components expect these to be present. (See defaultProps).
        onBlur: _react.PropTypes.func,
        onChange: _react.PropTypes.func,
        onFocus: _react.PropTypes.func
    });

    ComponentHOC.contextTypes = {
        layout: _react.PropTypes.string,
        validatePristine: _react.PropTypes.bool,
        rowClassName: classNameType,
        labelClassName: classNameType,
        elementWrapperClassName: classNameType
    };

    // TODO: Should probably add default props for:
    // * elementWrapperClassName
    // * labelClassName
    // * rowClassName
    // * layout
    ComponentHOC.defaultProps = {
        disabled: false,
        id: '',
        label: '',
        validatePristine: false,
        onBlur: function onBlur() {},
        onChange: function onChange() {},
        onFocus: function onFocus() {}
    };

    return (0, _formsyReact.HOC)(ComponentHOC);
};