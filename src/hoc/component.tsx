import * as React from 'react';
import {withFormsy} from 'formsy-react';
import FrcContext, {FrcContextType} from '../context/frc';

import {ClassValue} from 'classnames/types';

interface Props {
  // These are the props that we require from the formsy-react HOC.
  isFormDisabled: boolean;
  isFormSubmitted: boolean;
  isPristine: boolean;
  isRequired: boolean;
  isValid: boolean;
  setValue: Function;
  // End of formsy-react HOC props.

  rowClassName: ClassValue;
  labelClassName: ClassValue;
  elementWrapperClassName: ClassValue;

  name: string;
  disabled: boolean;

  // Composed components expect this to be a string.
  help: string;

  id: string;
  label: React.ReactNode;
  layout: 'horizontal' | 'vertical' | 'elementOnly';

  componentRef: Function;

  // * validateBeforeSubmit
  // * validatePristine
  //
  // Neither of these props actually stop the validations from running,
  // they just determine whether the error messages should be shown on
  // components or not.

  // Whether to hide validation errors on components before the form is
  // submitted.
  validateBeforeSubmit: boolean;

  // Whether to show validation errors on pristine (untouched) components.
  validatePristine: boolean;
}

const getDisplayName = (component): string =>
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
const FormsyReactComponent = (ComposedComponent): typeof React.Component => {
  class ComponentHOC extends React.Component<Props, {}> {
    public static displayName = `withFRC(${getDisplayName(ComposedComponent)})`;

    // TODO: Should we add default props for the following?:
    // * elementWrapperClassName
    // * labelClassName
    // * rowClassName

    // The following props get their default values from the parent context.
    // * layout
    // * validatePristine: (See getValidatePristine, defaults to 'false'),
    // * validateBeforeSubmit: (See getValidateOnSubmit, defaults to 'false'),
    public static defaultProps = {
      disabled: false,
      help: '',
      id: '',
      label: '',
      layout: '',
      validateBeforeSubmit: null,
      validatePristine: null,
    };

    private getBooleanFromPropsAndContext = (
      propsValue,
      contextValue,
      defaultValue: boolean,
    ): boolean => {
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
    private getId = (): string => {
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

    private hashString = (inString: string): number => {
      let hash = 0;
      for (let i = 0; i < inString.length; i += 1) {
        // eslint-disable-next-line no-bitwise
        hash = ((hash << 5) - hash + inString.charCodeAt(i)) & 0xffffffff;
      }
      return hash;
    };

    // Determine whether to show errors, or not.
    private shouldShowErrors = (
      validatePristine: boolean,
      validateBeforeSubmit: boolean,
    ): boolean => {
      const {isPristine, isFormSubmitted, isValid} = this.props;
      if (isPristine === true) {
        if (validatePristine === false) {
          return false;
        }
      }
      if (validateBeforeSubmit === false) {
        if (isFormSubmitted === false) {
          return false;
        }
      }
      return isValid === false;
    };

    // We pass through all unknown props, but delete some formsy HOC props
    // that we know we don't need.
    public render() {
      return (
        <FrcContext.Consumer>
          {(context: FrcContextType) => {
            const {
              componentRef,
              disabled,
              isFormDisabled,
              isPristine,
              isRequired,
              layout,
              setValue,
              validateBeforeSubmit: propValidateBeforeSubmit,
              validatePristine: propValidatePristine,
              elementWrapperClassName,
              labelClassName,
              rowClassName,
            } = this.props;

            const {
              layout: contextLayout,
              validateBeforeSubmit: contextValidateBeforeSubmit,
              validatePristine: contextValidatePristine,
              elementWrapperClassName: contextElementWrapperClassName,
              labelClassName: contextLabelClassName,
              rowClassName: contextRowClassName,
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
             * For ClassNames:
             *
             * - elementWrapperClassName
             * - labelClassName
             * - rowClassName
             *
             * We combine the parent context value with the component prop
             * value, the value from props comes second, so that it may override
             * the value set in the context. This is used for CSS classnames,
             * where the value is finally parsed using `JedWatson/classnames`.
             */
            const props = {
              ...this.props,
              elementWrapperClassName: [
                contextElementWrapperClassName,
                elementWrapperClassName,
              ],
              labelClassName: [contextLabelClassName, labelClassName],
              rowClassName: [contextRowClassName, rowClassName],
              disabled: isFormDisabled || disabled,
              id: this.getId(),
              isPristine,
              layout: layout || contextLayout,
              ref: componentRef,
              required: isRequired,
              showErrors: this.shouldShowErrors(
                validatePristine,
                validateBeforeSubmit,
              ),
              onSetValue: setValue,
            };

            // Props that we don't need to pass to our composed components.
            const unusedPropNames = [
              // From formsy-react HOC...
              'errorMessage',
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

            unusedPropNames.forEach((propName): void => {
              delete props[propName];
            });

            return <ComposedComponent {...props} />;
          }}
        </FrcContext.Consumer>
      );
    }
  }

  return withFormsy(ComponentHOC);
};

export default FormsyReactComponent;
