import React from 'react';
import classNames from 'classnames/dedupe';
import {ClassValue} from 'classnames/types'; // eslint-disable-line import/no-unresolved

const defaultProps = {
  className: '' as ClassValue,
  type: 'text',
  elementRef: React.createRef<HTMLInputElement>(),
};

type InputControlProps = React.InputHTMLAttributes<HTMLInputElement> &
  typeof defaultProps;

class InputControl extends React.Component<InputControlProps, {}> {
  public static defaultProps = defaultProps;

  public render(): JSX.Element {
    const {className, type, elementRef, ...passthroughProps} = this.props;
    const inputClassNames: ClassValue[] = ['form-control', className];
    if (['hidden', 'range'].indexOf(type) !== -1) {
      inputClassNames.push({'form-control': false});
    }
    if (type === 'range') {
      inputClassNames.push('custom-range');
    }
    return (
      <input
        {...passthroughProps}
        className={classNames(inputClassNames)}
        ref={elementRef}
        type={type}
      />
    );
  }
}

export {InputControlProps};
export default InputControl;
