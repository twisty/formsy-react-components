import React from 'react';
import FrcContext from '../context/frc';
import {
  getId,
  getFallbackBoolean,
  getDisplayName,
  shouldShowErrors,
} from '../utils';
import {LayoutType, ComponentValue} from '../types';

/**
 * Props coming from the `withFormsy` hoc.
 */
interface ExternalProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  errorMessage: any;
  hasValue: any;
  innerRef: any;
  isFormDisabled: boolean;
  isFormSubmitted: boolean;
  isPristine: boolean;
  isRequired: boolean;
  isValid: boolean;
  isValidValue: boolean;
  resetValue: any;
  setValidations: any;
  setValue: any;
  showError: boolean;
  showRequired: boolean;
  validationError: any;
  validationErrors: any;
  validations: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

/**
 * Props that come from our components.
 */
interface RequiredFromOriginalComponentProps {
  validateBeforeSubmit: boolean;
  validatePristine: boolean;
  layout: LayoutType;
  name: string;
  value: ComponentValue;
  disabled: boolean;
  id: string;
  label: React.ReactNode;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  componentRef: React.RefObject<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

/**
 * withFRC HOC
 *
 * This HOC provides shared code for our form components.
 *
 * We use this to merge props set using our FrcContext, so that
 * we can set commonly used props on an enclosing component.
 *
 * This allows us to set these properties 'as a whole' for each component in the
 * the form, while retaining the ability to override the prop on a per-component
 * basis.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const withFRC = <TOriginalProps extends {}>(
  Component:
    | React.ComponentClass<TOriginalProps>
    | React.FunctionComponent<TOriginalProps>,
) => {
  type ResultProps = TOriginalProps &
    ExternalProps &
    RequiredFromOriginalComponentProps;

  const result = class FrcWrapper extends React.Component<ResultProps, {}> {
    public static displayName = `withFRC(${getDisplayName(Component)})`;
    public static contextType = FrcContext;

    public constructor(props: ResultProps) {
      super(props);
    }

    public render(): JSX.Element {
      const {
        layout: contextLayout,
        validateBeforeSubmit: contextValidateBeforeSubmit,
        validatePristine: contextValidatePristine,
      } = this.context;

      const {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        errorMessage,
        hasValue,
        innerRef,
        isRequired,
        isValidValue,
        resetValue,
        setValidations,
        showError,
        showRequired,
        validationError,
        validationErrors,
        validations,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        isFormDisabled,
        isFormSubmitted,
        isPristine,
        isValid,
        setValue,
        validateBeforeSubmit: propValidateBeforeSubmit,
        validatePristine: propValidatePristine,
        layout: propLayout,
        disabled: propDisabled,
        id: propId,
        label: propLabel,
        name: propName,
        componentRef,
        ...props
      } = this.props;

      const validatePristine = getFallbackBoolean(
        propValidatePristine,
        contextValidatePristine,
        false,
      );

      const validateBeforeSubmit = getFallbackBoolean(
        propValidateBeforeSubmit,
        contextValidateBeforeSubmit,
        true,
      );

      const showErrors = shouldShowErrors(
        isPristine,
        isFormSubmitted,
        isValid,
        validatePristine,
        validateBeforeSubmit,
      );

      const layout = propLayout || contextLayout;

      const newProps = {
        id: getId(propId || '', propLabel || '', propName),
        label: propLabel,
        name: propName,
        ref: componentRef,
        disabled: isFormDisabled || propDisabled || false,
        layout,
        showErrors,
        onSetValue: setValue,
      };

      return <Component {...(props as TOriginalProps)} {...newProps} />;
    }
  };

  return result;
};

export default withFRC;
