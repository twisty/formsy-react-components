import React, { Component, PropTypes } from 'react';
import { HOC as FormsyHOC } from 'formsy-react';

// These are the types of props that we can convert to a HTML 'class' attribute value.
// See: https://github.com/JedWatson/classnames
const classNameType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
]);

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
export var FormsyReactComponent = (ComposedComponent) => {
    class ComponentHOC extends Component {

        // The following methods are used to merge master default properties that
        // are optionally set on the parent form using the ParentContextMixin.
        getLayout = () => {
            var defaultProperty = this.context.layout || 'horizontal';
            return this.props.layout ? this.props.layout : defaultProperty;
        }

        getValidatePristine = () => {
            var defaultProperty = this.context.validatePristine || false;
            return this.props.validatePristine ? this.props.validatePristine : defaultProperty;
        }

        getRowClassName = () => {
            return [this.context.rowClassName, this.props.rowClassName];
        }

        getLabelClassName = () => {
            return [this.context.labelClassName, this.props.labelClassName];
        }

        getElementWrapperClassName = () => {
            return [this.context.elementWrapperClassName, this.props.elementWrapperClassName];
        }

        getComponentProps = () => {
            return {
                disabled: (this.props.isFormDisabled() || this.props.disabled),
                elementWrapperClassName: this.getElementWrapperClassName(),
                errorMessages: this.props.getErrorMessages(),
                id: this.getId(),
                labelClassName: this.getLabelClassName(),
                layout: this.getLayout(),
                required: this.props.isRequired(),
                rowClassName: this.getRowClassName(),
                showErrors: this.shouldShowErrors(),
                value: this.props.getValue(),
                onSetValue: this.props.setValue
            };
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
            return (this.props.isValid() === false);
        }

        // We pass through all props, but some are overwritten with `massaged`
        // versions to give our components what they expect.
        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    {...this.getComponentProps()}
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

        name: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        elementWrapperClassName: classNameType,

        // Not used here, but composed components expect this to be a string.
        help: PropTypes.string,

        id: PropTypes.string,
        label: PropTypes.string,
        labelClassName: classNameType,
        layout: PropTypes.string,
        rowClassName: classNameType,
        validatePristine: PropTypes.bool,

        // TODO: Not sure having these here this is a good idea.
        // These callbacks are not used here, but added because composed
        // components expect these to be present. (See defaultProps).
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func
    };

    ComponentHOC.contextTypes = {
        layout: PropTypes.string,
        validatePristine: PropTypes.bool,
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
        onBlur: function() {},
        onChange: function() {},
        onFocus: function() {}
    };

    return FormsyHOC(ComponentHOC);

};
