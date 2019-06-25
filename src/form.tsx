import * as React from 'react';
import classNames from 'classnames/dedupe';
import Formsy from 'formsy-react';
import FrcContext from './context/frc';
import {ClassValue} from 'classnames/types';

type FormPropsCleaned = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'className' | 'onChange' | 'onInvalid' | 'onSubmit'
>;

/**
 * Formsy props taken from:
 *
 * - https://github.com/formsy/formsy-react/blob/master/API.md#formsy
 */
interface FormsyProps extends FormPropsCleaned {
  mapping?: Function;
  validationErrors?: Function;
  onSubmit?: Function;
  onValid?: Function;
  onInvalid?: Function;
  onValidSubmit?: Function;
  onInvalidSubmit?: Function;
  onChange?: Function;
  preventExternalInvalidation?: boolean;
}

export interface Props extends FormsyProps {
  children: React.ReactNode;
  layout: 'horizontal' | 'vertical' | 'elementOnly';
  className: ClassValue;
  validateBeforeSubmit: boolean;
  validatePristine: boolean;
  elementWrapperClassName: ClassValue;
  labelClassName: ClassValue;
  rowClassName: ClassValue;
  disabled: boolean;
}

class Form extends React.Component<Props, {}> {
  public formsyForm = React.createRef<Formsy>();

  public static defaultProps = {
    layout: 'horizontal',
    className: '',
    elementWrapperClassName: '',
    labelClassName: '',
    rowClassName: '',
    validateBeforeSubmit: true,
    validatePristine: false,
    disabled: false,
  };

  public render() {
    const {
      children,
      className,
      elementWrapperClassName,
      labelClassName,
      layout,
      rowClassName,
      validateBeforeSubmit,
      validatePristine,
      ...formsyProps
    } = this.props;

    const contextProps = {
      elementWrapperClassName,
      labelClassName,
      layout,
      rowClassName,
      validateBeforeSubmit,
      validatePristine,
    };

    const formClassNames = classNames([`form-${layout}`, className]);

    return (
      <FrcContext.Provider value={contextProps}>
        <Formsy
          {...formsyProps}
          className={formClassNames}
          ref={this.formsyForm}>
          {children}
        </Formsy>
      </FrcContext.Provider>
    );
  }
}

export default Form;
