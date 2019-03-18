import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withFormsy} from 'formsy-react';
import FrcContext from '../context/frc';
import {styleClassNames} from '../components/component-common';

const getDisplayName = component =>
  component.displayName ||
  component.name ||
  (typeof component === 'string' ? component : 'Component');

/**
 * Component HOC
 * -------------
 *
 * This HOC provides shared code for our form components.
 *
 * We use this to merge props set using our OptionsProvider, so that
 * we can set commonly used props on an enclosing component.
 *
 * This allows us to set these properties 'as a whole' for each component in the
 * the form, while retaining the ability to override the prop on a per-component
 * basis.
 */
const FormsyReactComponent = ComposedComponent => {
  class ComponentHOC extends Component {
    /**
     * Use the following value for validatePristine:
     * 1. validatePristine prop (if supplied)
     * 2. [else] validatePristine context (if defined)
     * 3. [else] false (default value)
     */
    getValidatePristine = context => {
      const {validatePristine} = this.props;
      if (typeof validatePristine === 'boolean') {
        return validatePristine;
      }
      const {validatePristine: validatePristineContext} = context;
      return validatePristineContext || false;
    };

    // Use the following value for validateOnSubmit:
    // 1. validateOnSubmit prop (if supplied)
    // 2. [else] validateOnSubmit context (if defined)
    // 3. [else] false (default value)
    getValidateOnSubmit = context => {
      const {validateOnSubmit} = this.props;
      if (typeof validateOnSubmit === 'boolean') {
        return validateOnSubmit;
      }
      const {validateOnSubmit: validateOnSubmitContext} = context;
      return validateOnSubmitContext || false;
    };

    // getId
    // -----
    //
    // The ID is used as an attribute on the form control, and is used to allow
    // associating the label element with the form control.
    //
    // If we don't explicitly pass an `id` prop, we generate one based on the
    // `name` and `label` properties.
    getId = () => {
      const {id, label, name} = this.props;
      if (id !== '') {
        return id;
      }
      return [
        'frc',
        name
          .split('[')
          .join('_')
          .replace(']', ''),
        this.hashString(JSON.stringify(label)),
      ].join('-');
    };

    hashString = string => {
      let hash = 0;
      for (let i = 0; i < string.length; i += 1) {
        // eslint-disable-next-line no-bitwise
        hash = ((hash << 5) - hash + string.charCodeAt(i)) & 0xffffffff;
      }
      return hash;
    };

    // Determine whether to show errors, or not.
    shouldShowErrors = context => {
      const {isPristine, isFormSubmitted, isValid} = this.props;
      if (isPristine() === true) {
        if (this.getValidatePristine(context) === false) {
          return false;
        }
      }
      if (this.getValidateOnSubmit(context) === true) {
        if (isFormSubmitted() === false) {
          return false;
        }
      }
      return isValid() === false;
    };

    // We pass through all unknown props, but delete some formsy HOC props
    // that we know we don't need.
    render() {
      return (
        <FrcContext.Consumer>
          {context => {
            const {
              componentRef,
              disabled,
              getErrorMessages,
              getValue,
              isFormDisabled,
              isPristine,
              isRequired,
              layout,
              setValue,
            } = this.props;

            const {layout: contextLayout} = context;

            // Combine a parent context value with a component prop value.
            // This is used for CSS classnames, where the value is passed to `JedWatson/classnames`.
            const combineContextWithProp = key => {
              const {[key]: contextValue} = context;
              const {[key]: propsValue} = this.props;
              return [contextValue, propsValue];
            };

            const props = {
              ...this.props,
              elementWrapperClassName: combineContextWithProp(
                'elementWrapperClassName',
              ),
              labelClassName: combineContextWithProp('labelClassName'),
              rowClassName: combineContextWithProp('rowClassName'),
              disabled: isFormDisabled() || disabled,
              errorMessages: getErrorMessages(),
              id: this.getId(),
              isPristine,
              layout: layout || contextLayout,
              ref: componentRef,
              required: isRequired(),
              showErrors: this.shouldShowErrors(context),
              value: getValue(),
              onSetValue: setValue,
            };

            // Props that we don't need to pass to our composed components.
            const unusedPropNames = [
              // From formsy-react HOC...
              'getErrorMessage',
              'getErrorMessages',
              'getValue',
              'hasValue',
              'isFormDisabled',
              'isFormSubmitted',
              'isRequired',
              'isValid',
              'isValidValue',
              'resetValue',
              'setValidations',
              'setValue',
              'showError',
              'showRequired',
              'validationError',
              'validationErrors',
              'validations',
              'innerRef',
              // From formsy-react-component HOC...
              'componentRef',
              'validateOnSubmit',
              'validatePristine',
            ];

            unusedPropNames.forEach(propName => {
              delete props[propName];
            });

            return <ComposedComponent {...props} />;
          }}
        </FrcContext.Consumer>
      );
    }
  }

  ComponentHOC.propTypes = {
    // These are the props that we require from the formsy-react HOC.
    getErrorMessages: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    isFormDisabled: PropTypes.func.isRequired,
    isPristine: PropTypes.func.isRequired,
    isRequired: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    // End of formsy-react HOC props.

    ...styleClassNames,

    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,

    // Composed components expect this to be a string.
    help: PropTypes.string,

    id: PropTypes.string,
    label: PropTypes.node,
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
    validatePristine: PropTypes.bool,
  };

  // TODO: Should we add default props for the following?:
  // * elementWrapperClassName
  // * labelClassName
  // * rowClassName

  // The following props get their default values from the parent context.
  // * layout
  // * validatePristine: (See getValidatePristine, defaults to 'false'),
  // * validateOnSubmit: (See getValidateOnSubmit, defaults to 'false'),
  ComponentHOC.defaultProps = {
    disabled: false,
    help: '',
    id: '',
    label: '',
    layout: '',
    validateOnSubmit: null,
    validatePristine: null,
  };

  ComponentHOC.displayName = `withFRC(${getDisplayName(ComposedComponent)})`;

  return withFormsy(ComponentHOC);
};

export default FormsyReactComponent;
