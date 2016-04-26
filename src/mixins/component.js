import React, { PropTypes } from 'react';

// These are the types of props that we can convert to a HTML 'class' attribute value.
// See: https://github.com/JedWatson/classnames
const classNameType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
]);

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
const ComponentMixin = {

    propTypes: {
        elementWrapperClassName: classNameType,
        labelClassName: classNameType,
        layout: PropTypes.string,
        rowClassName: classNameType,
        validatePristine: PropTypes.bool
    },

    contextTypes: {
        layout: PropTypes.string,
        validatePristine: PropTypes.bool,
        rowClassName: classNameType,
        labelClassName: classNameType,
        elementWrapperClassName: classNameType
    },

    getDefaultProps: function() {
        return {
            disabled: false,
            validatePristine: false,
            onChange: function() {},
            onFocus: function() {},
            onBlur: function() {}
        };
    },

    // The following methods are used to merge master default properties that
    // are optionally set on the parent form using the ParentContextMixin.
    getLayout: function() {
        var defaultProperty = this.context.layout || 'horizontal';
        return this.props.layout ? this.props.layout : defaultProperty;
    },

    getValidatePristine: function() {
        var defaultProperty = this.context.validatePristine || false;
        return this.props.validatePristine ? this.props.validatePristine : defaultProperty;
    },

    getRowClassName: function() {
        return [this.context.rowClassName, this.props.rowClassName];
    },

    getLabelClassName: function() {
        return [this.context.labelClassName, this.props.labelClassName];
    },

    getElementWrapperClassName: function() {
        return [this.context.elementWrapperClassName, this.props.elementWrapperClassName];
    },

    getRowProperties: function() {
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
    getId: function() {
        if (this.props.id) {
            return this.props.id;
        }
        var label = (typeof this.props.label === 'undefined' ? '' : this.props.label);
        return [
            'frc',
            this.props.name.split('[').join('_').replace(']', ''),
            this.hashString(JSON.stringify(label))
        ].join('-');
    },

    hashString: function(string) {
        var hash = 0;
        for (var i = 0; i < string.length; i++) {
            hash = (((hash << 5) - hash) + string.charCodeAt(i)) & 0xFFFFFFFF;
        }
        return hash;
    },

    renderHelp: function() {
        if (!this.props.help) {
            return null;
        }
        return (
            <span className="help-block">{this.props.help}</span>
        );
    },

    // TODO this ought to be called renderErrorMessages.
    renderErrorMessage: function() {
        if (!this.showErrors()) {
            return null;
        }
        var errorMessages = this.getErrorMessages() || [];
        return errorMessages.map((message, key) => {
            return (
                <span key={key} className="help-block validation-message">{message}</span>
            );
        });
    },

    // Determine whether to show errors, or not.
    // TODO this ought to be called shouldShowErrors?
    showErrors: function() {
        if (this.isPristine() === true) {
            if (this.getValidatePristine() === false) {
                return false;
            }
        }
        return (this.isValid() === false);
    }
};

export default ComponentMixin;
