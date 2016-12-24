'use strict';

var React = require('react');

module.exports = {

    propTypes: {
        layout: React.PropTypes.string,
        validatePristine: React.PropTypes.bool,
        validateOnSubmit: React.PropTypes.bool,
        rowClassName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object]),
        labelClassName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object]),
        elementWrapperClassName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object])
    },

    contextTypes: {
        layout: React.PropTypes.string,
        validatePristine: React.PropTypes.bool,
        validateOnSubmit: React.PropTypes.bool,
        rowClassName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object]),
        labelClassName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object]),
        elementWrapperClassName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            validatePristine: false,
            validateOnSubmit: false,
            onChange: function onChange() {},
            onFocus: function onFocus() {},
            onBlur: function onBlur() {}
        };
    },

    /**
     * Accessors for "special" properties.
     *
     * The following methods are used to merge master default properties that
     * are optionally set on the parent form. This to to allow customising these
     * properties 'as a whole' for the form, while retaining the ability to
     * override the properties on a component basis.
     *
     * Also see the parent-context mixin.
     */
    getLayout: function getLayout() {
        var defaultProperty = this.context.layout || 'horizontal';
        return this.props.layout ? this.props.layout : defaultProperty;
    },

    getValidatePristine: function getValidatePristine() {
        var defaultProperty = this.context.validatePristine || false;
        return this.props.validatePristine ? this.props.validatePristine : defaultProperty;
    },

    getValidateOnSubmit: function getValidateOnSubmit() {
        var defaultProperty = this.context.validateOnSubmit || false;
        return this.props.validateOnSubmit ? this.props.validateOnSubmit : defaultProperty;
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

    hashString: function hashString(string) {
        var hash = 0;
        for (var i = 0; i < string.length; i++) {
            hash = (hash << 5) - hash + string.charCodeAt(i) & 0xFFFFFFFF;
        }
        return hash;
    },

    /**
     * getId
     *
     * The ID is used as an attribute on the form control, and is used to allow
     * associating the label element with the form control.
     *
     * If we don't explicitly pass an `id` prop, we generate one based on the
     * `name` and `label` properties.
     */
    getId: function getId() {
        if (this.props.id) {
            return this.props.id;
        }
        var label = typeof this.props.label === 'undefined' ? '' : this.props.label;
        return ['frc', this.props.name.split('[').join('_').replace(']', ''), this.hashString(JSON.stringify(label))].join('-');
    },

    renderHelp: function renderHelp() {
        if (!this.props.help) {
            return null;
        }
        return React.createElement(
            'span',
            { className: 'help-block' },
            this.props.help
        );
    },

    renderErrorMessage: function renderErrorMessage() {
        if (!this.showErrors()) {
            return null;
        }
        var errorMessages = this.getErrorMessages() || [];
        return errorMessages.map(function (message, key) {
            return React.createElement(
                'span',
                { key: key, className: 'help-block validation-message' },
                message
            );
        });
    },

    showErrors: function showErrors() {
        if (this.isPristine() && !this.getValidatePristine()) {
            return false;
        }
        if (this.getValidateOnSubmit() && !this.isFormSubmitted()) {
            return false;
        }
        return !this.isValid();
    }
};