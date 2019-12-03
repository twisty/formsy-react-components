import * as React from 'react';
import classNames from 'classnames/dedupe';
import Formsy, {FormsyProps} from 'formsy-react';
import {ClassValue} from 'classnames/types'; // eslint-disable-line import/no-unresolved
import {LayoutType} from './types';
import FrcContext from './context/frc';

type FormPropsCleaned = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'className' | 'onChange' | 'onInvalid' | 'onSubmit' | 'onError' | 'onReset'
>;

type FormsyPropsCleaned = Omit<FormsyProps, 'className'>;

const formDefaultProps = {
  layout: 'horizontal' as LayoutType,
  className: '' as ClassValue,
  elementWrapperClassName: '' as ClassValue,
  labelClassName: '' as ClassValue,
  rowClassName: '' as ClassValue,
  validateBeforeSubmit: true,
  validatePristine: false,
  disabled: false,
};

type DefaultProps = typeof formDefaultProps;

type FormProps = FormPropsCleaned & Partial<FormsyPropsCleaned> & DefaultProps;

class Form extends React.Component<FormProps, {}> {
  public static defaultProps = formDefaultProps;

  public formsyForm = React.createRef<Formsy>();

  public constructor(props) {
    super(props);
  }

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
      ...formsyPassthroughProps
    } = this.props;

    const contextProps = {
      elementWrapperClassName,
      labelClassName,
      layout,
      rowClassName,
      validateBeforeSubmit,
      validatePristine,
    };

    return (
      <FrcContext.Provider value={contextProps}>
        <Formsy
          {...formsyPassthroughProps}
          className={classNames([`form-${layout}`, className])}
          ref={this.formsyForm}>
          {children}
        </Formsy>
      </FrcContext.Provider>
    );
  }
}

export default Form;
