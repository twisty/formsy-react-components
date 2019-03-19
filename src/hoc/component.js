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
    getBooleanFromPropsAndContext = (
      propsValue,
      contextValue,
      defaultValue,
    ) => {
      if (typeof propsValue === 'boolean') {
        return propsValue;
      }
      if (typeof contextValue === 'boolean') {
        return contextValue;
      }
      return defaultValue;
    };

    /**
     * getId
     * -----
     *
     * The ID is used as an attribute on the form control, and is used to allow
     * associating the label element with the form control.
     *
     * If we don't explicitly pass an `id` prop, we generate one based on the
     * `name` and `label` properties.
     */
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
    shouldShowErrors = (validatePristine, validateBeforeSubmit) => {
      const {isPristine, isFormSubmitted, isValid} = this.props;
      if (isPristine() === true) {
        if (validatePristine === false) {
          return false;
        }
      }
      if (validateBeforeSubmit === false) {
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
              validateBeforeSubmit: propValidateBeforeSubmit,
              validatePristine: propValidatePristine,
            } = this.props;

            const {
              layout: contextLayout,
              validateBeforeSubmit: contextValidateBeforeSubmit,
              validatePristine: contextValidatePristine,
            } = context;

            const validatePristine = this.getBooleanFromPropsAndContext(
              propValidatePristine,
              contextValidatePristine,
              false,
            );

            const validateBeforeSubmit = this.getBooleanFromPropsAndContext(
              propValidateBeforeSubmit,
              contextValidateBeforeSubmit,
              true,
            );

            /**
             * Combine a parent context value with a component prop value.
             * This is used for CSS classnames, where the value is passed to `JedWatson/classnames`.
             */
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
              showErrors: this.shouldShowErrors(
                validatePristine,
                validateBeforeSubmit,
              ),
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
              'validateBeforeSubmit',
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

    // * validateBeforeSubmit
    // * validatePristine
    //
    // Neither of these props actually stop the validations from running,
    // they just determine whether the error messages should be shown on
    // components or not.

    // Whether to hide validation errors on components before the form is
    // submitted.
    validateBeforeSubmit: PropTypes.bool,

    // Whether to show validation errors on pristine (untouched) components.
    validatePristine: PropTypes.bool,
  };

  ComponentHOC.contextTypes = {
    ...styleClassNames,
    layout: PropTypes.string,
    validateBeforeSubmit: PropTypes.bool,
    validatePristine: PropTypes.bool,
  };

  // TODO: Should we add default props for the following?:
  // * elementWrapperClassName
  // * labelClassName
  // * rowClassName

  // The following props get their default values from the parent context.
  // * layout
  // * validatePristine: (See getValidatePristine, defaults to 'false'),
  // * validateBeforeSubmit: (See getValidateOnSubmit, defaults to 'false'),
  ComponentHOC.defaultProps = {
    disabled: false,
    help: '',
    id: '',
    label: '',
    layout: '',
    validateBeforeSubmit: null,
    validatePristine: null,
  };

  ComponentHOC.displayName = `withFRC(${getDisplayName(ComposedComponent)})`;

  return withFormsy(ComponentHOC);
};

export default FormsyReactComponent;
