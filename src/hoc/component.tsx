import * as React from 'react';
import FrcContext from '../context/frc';
import {
  getId,
  getFallbackBoolean,
  getDisplayName,
  shouldShowErrors,
} from '../utils';
import {LayoutType, ComponentValue} from '../types';

import type {PassDownProps} from 'formsy-react/dist/withFormsy';

/**
 * Props coming from the `withFormsy` hoc.
 */
type ExternalProps<V> = PassDownProps<V>;

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
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
const withFRC = <TOriginalProps extends Record<string, unknown>>(
  Component:
    | React.ComponentClass<TOriginalProps>
    | React.FunctionComponent<TOriginalProps>,
) => {
  type ResultProps = TOriginalProps &
    ExternalProps<TOriginalProps> &
    RequiredFromOriginalComponentProps;

  const result = class FrcWrapper extends React.Component<
    ResultProps,
    Record<string, unknown>
  > {
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
