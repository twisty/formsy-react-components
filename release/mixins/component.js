'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// These are the types of props that we can convert to a HTML 'class' attribute value.
// See: https://github.com/JedWatson/classnames
var classNameType = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array, _react.PropTypes.object]);

// Component Mixin
// ---------------
//
// This mixin provides shared code for our form components.
//
// We also use this to merge props set using the ParentContextMixin, so that
// commonly used props can be set on an enclosing component.
//
// This allows us to set these properties 'as a whole' for each component in the
// the form, while retaining the ability to override the prop on a per-component
// basis.
var ComponentMixin = {

    propTypes: {
        elementWrapperClassName: classNameType,
        labelClassName: classNameType,
        layout: _react.PropTypes.string,
        rowClassName: classNameType,
        validatePristine: _react.PropTypes.bool
    },

    contextTypes: {
        layout: _react.PropTypes.string,
        validatePristine: _react.PropTypes.bool,
        rowClassName: classNameType,
        labelClassName: classNameType,
        elementWrapperClassName: classNameType
    },

    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            validatePristine: false,
            onChange: function onChange() {},
            onFocus: function onFocus() {},
            onBlur: function onBlur() {}
        };
    },

    // The following methods are used to merge master default properties that
    // are optionally set on the parent form using the ParentContextMixin.
    getLayout: function getLayout() {
        var defaultProperty = this.context.layout || 'horizontal';
        return this.props.layout ? this.props.layout : defaultProperty;
    },

    getValidatePristine: function getValidatePristine() {
        var defaultProperty = this.context.validatePristine || false;
        return this.props.validatePristine ? this.props.validatePristine : defaultProperty;
    },

    getRowClassName: function getRowClassName() {
        return [this.context.rowClassName, this.props.rowClassName];
    },

    getLabelClassName: function getLabelClassName() {
        return [this.context.labelClassName, this.props.labelClassName];
    },

    getElementWrapperClassName: function getElementWrapperClassName() {
        return [this.context.elementWrapperClassName, this.props.elementWrapperClassName];
    },

    getRowProperties: function getRowProperties() {
        return {
            label: this.props.label,
            rowClassName: this.getRowClassName(),
            labelClassName: this.getLabelClassName(),
            elementWrapperClassName: this.getElementWrapperClassName(),
            layout: this.getLayout(),
            required: this.isRequired(),
            hasErrors: this.showErrors()
        };
    },

    // getId
    // -----
    //
    // The ID is used as an attribute on the form control, and is used to allow
    // associating the label element with the form control.
    //
    // If we don't explicitly pass an `id` prop, we generate one based on the
    // `name` and `label` properties.
    getId: function getId() {
        if (this.props.id) {
            return this.props.id;
        }
        var label = typeof this.props.label === 'undefined' ? '' : this.props.label;
        return ['frc', this.props.name.split('[').join('_').replace(']', ''), this.hashString(JSON.stringify(label))].join('-');
    },

    hashString: function hashString(string) {
        var hash = 0;
        for (var i = 0; i < string.length; i++) {
            hash = (hash << 5) - hash + string.charCodeAt(i) & 0xFFFFFFFF;
        }
        return hash;
    },

    renderHelp: function renderHelp() {
        if (!this.props.help) {
            return null;
        }
        return _react2.default.createElement(
            'span',
            { className: 'help-block' },
            this.props.help
        );
    },

    // TODO this ought to be called renderErrorMessages.
    renderErrorMessage: function renderErrorMessage() {
        if (!this.showErrors()) {
            return null;
        }
        var errorMessages = this.getErrorMessages() || [];
        return errorMessages.map(function (message, key) {
            return _react2.default.createElement(
                'span',
                { key: key, className: 'help-block validation-message' },
                message
            );
        });
    },

    // Determine whether to show errors, or not.
    // TODO this ought to be called shouldShowErrors?
    showErrors: function showErrors() {
        if (this.isPristine() === true) {
            if (this.getValidatePristine() === false) {
                return false;
            }
        }
        return this.isValid() === false;
    }
};

exports.default = ComponentMixin;