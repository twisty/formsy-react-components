import * as React from 'react';
import classNames from 'classnames/dedupe';
import Formsy from 'formsy-react';
import FrcContext from './context/frc';
import {ClassNamesType} from './types';

export interface Props {
  children: React.ReactNode;
  layout: 'horizontal' | 'vertical' | 'elementOnly';
  className: ClassNamesType;
  validateBeforeSubmit: boolean;
  validatePristine: boolean;
  elementWrapperClassName: ClassNamesType;
  labelClassName: ClassNamesType;
  rowClassName: ClassNamesType;
}

class Form extends React.Component<Props, {}> {
  public formsyForm: React.RefObject<Formsy>;

  public static defaultProps = {
    layout: 'horizontal',
    className: '',
    elementWrapperClassName: '',
    labelClassName: '',
    rowClassName: '',
    validateBeforeSubmit: true,
    validatePristine: false,
  };

  public render(): JSX.Element {
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

    const refCallback = (formsyForm): void => {
      this.formsyForm = formsyForm;
    };

    const formClassNames = classNames([`form-${layout}`, className]);

    return (
      <FrcContext.Provider value={contextProps}>
        <Formsy {...formsyProps} className={formClassNames} ref={refCallback}>
          {children}
        </Formsy>
      </FrcContext.Provider>
    );
  }
}

export {ClassNamesType};
export default Form;
