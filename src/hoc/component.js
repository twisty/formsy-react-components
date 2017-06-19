import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HOC as FormsyHOC } from 'formsy-react';
import { styleClassNames } from '../components/prop-types';

// Component HOC
// -------------
//
// This HOC provides shared code for our form components.
//
// We use this to merge props set using our OptionsProvider, so that
// we can set commonly used props on an enclosing component.
//
// This allows us to set these properties 'as a whole' for each component in the
// the form, while retaining the ability to override the prop on a per-component
// basis.
const FormsyReactComponent = (ComposedComponent) => {
    class ComponentHOC extends Component {

        // Use the following value for layout:
        // 1. layout prop (if supplied)
        // 2. [else] layout context (if defined)
        // 3. [else] 'horizontal' (default value)
        getLayout = () => {
            return this.props.layout || (this.context.layout || 'horizontal');
        }

        // Use the following value for validatePristine:
        // 1. validatePristine prop (if supplied)
        // 2. [else] validatePristine context (if defined)
        // 3. [else] false (default value)
        getValidatePristine = () => {
            if (typeof this.props.validatePristine === 'boolean') {
                return this.props.validatePristine;
            }
            return this.context.validatePristine || false;
        }

        // Use the following value for validateOnSubmit:
        // 1. validateOnSubmit prop (if supplied)
        // 2. [else] validateOnSubmit context (if defined)
        // 3. [else] false (default value)
        getValidateOnSubmit = () => {
            if (typeof this.props.validateOnSubmit === 'boolean') {
                return this.props.validateOnSubmit;
            }
            return this.context.validateOnSubmit || false;
        }

        // Combine a parent context value with a component prop value.
        // This is used for CSS classnames, where the value is passed to `JedWatson/classnames`.
        combineContextWithProp = (key) => {
            return [this.context[key], this.props[key]];
        }

        // getId
        // -----
        //
        // The ID is used as an attribute on the form control, and is used to allow
        // associating the label element with the form control.
        //
        // If we don't explicitly pass an `id` prop, we generate one based on the
        // `name` and `label` properties.
        getId = () => {
            let { id, label, name } = this.props;
            if (id !== '') {
                return id;
            }
            return [
                'frc',
                name.split('[').join('_').replace(']', ''),
                this.hashString(JSON.stringify(label))
            ].join('-');
        }

        hashString = (string) => {
            var hash = 0;
            for (var i = 0; i < string.length; i++) {
                hash = (((hash << 5) - hash) + string.charCodeAt(i)) & 0xFFFFFFFF;
            }
            return hash;
        }

        // Determine whether to show errors, or not.
        shouldShowErrors = () => {
            if (this.props.isPristine() === true) {
                if (this.getValidatePristine() === false) {
                    return false;
                }
            }
            if (this.getValidateOnSubmit() === true) {
                if (this.props.isFormSubmitted() === false) {
                    return false;
                }
            }
            return (this.props.isValid() === false);
        }

        // We pass through all unknown props, but delete some formsy HOC props that we know we don't need.
        render() {

            let cssProps = {
                elementWrapperClassName: this.combineContextWithProp('elementWrapperClassName'),
                labelClassName:          this.combineContextWithProp('labelClassName'),
                rowClassName:            this.combineContextWithProp('rowClassName'),
            };

            let props = {
                ...this.props,
                ...cssProps,
                disabled:      this.props.isFormDisabled() || this.props.disabled,
                errorMessages: this.props.getErrorMessages(),
                id:            this.getId(),
                layout:        this.getLayout(),
                ref:           this.props.componentRef,
                required:      this.props.isRequired(),
                showErrors:    this.shouldShowErrors(),
                value:         this.props.getValue(),
                onSetValue:    this.props.setValue
            };

            // Formsy HOC props we don't use.
            delete props.getErrorMessage;
            delete props.getErrorMessages;
            delete props.getValue;
            delete props.hasValue;
            delete props.isFormDisabled;
            delete props.isFormSubmitted;
            delete props.isPristine;
            delete props.isRequired;
            delete props.isValid;
            delete props.isValidValue;
            delete props.resetValue;
            delete props.setValidations;
            delete props.setValue;
            delete props.showError;
            delete props.showRequired;

            // Formsy props we don't use
            delete props.validationError;
            delete props.validationErrors;
            delete props.validations;

            // HOC refs
            delete props.innerRef;
            delete props.componentRef;

            return (
                <ComposedComponent
                    {...props}
                />
            );
        }
    }

    // These are the props that we require from the formsy-react HOC.
    // There are others, but as we don't use them, we don't need to define their PropTypes.
    const formsyPropTypes = {
        getErrorMessages: PropTypes.func.isRequired,
        getValue: PropTypes.func.isRequired,
        isFormDisabled: PropTypes.func.isRequired,
        isPristine: PropTypes.func.isRequired,
        isRequired: PropTypes.func.isRequired,
        isValid: PropTypes.func.isRequired,
        setValue: PropTypes.func.isRequired
    };

    ComponentHOC.propTypes = {

        ...formsyPropTypes,
        ...styleClassNames,

        name: PropTypes.string.isRequired,
        disabled: PropTypes.bool,

        // Not used here, but composed components expect this to be a string.
        help: PropTypes.string,

        id: PropTypes.string,
        label: PropTypes.string,
        layout: PropTypes.string,

        // * validateOnSubmit
        // * validatePristine
        //
        // Neither of these props actually stop the validations from running,
        // they just determine whether the error messages should be shown on
        // components or not.

        // Whether to hide validation errors on components before the form is
        // submitted.
        validateOnSubmit: PropTypes.bool,

        // Whether to show validation errors on pristine (untouched) components.
        validatePristine: PropTypes.bool,
    };

    ComponentHOC.contextTypes = {
        ...styleClassNames,
        layout: PropTypes.string,
        validateOnSubmit: PropTypes.bool,
        validatePristine: PropTypes.bool
    };

    // TODO: Should we add default props for the following?:
    // * elementWrapperClassName
    // * labelClassName
    // * rowClassName

    // The following props get their default values by first looking for props in the parent context.
    // * layout (See getLayout, defaults to 'horizontal')
    // * validatePristine: (See getValidatePristine, defaults to 'false'),
    // * validateOnSubmit: (See getValidateOnSubmit, defaults to 'false'),
    ComponentHOC.defaultProps = {
        disabled: false,
        id: '',
        label: ''
    };

    return FormsyHOC(ComponentHOC);

};

export default FormsyReactComponent;
