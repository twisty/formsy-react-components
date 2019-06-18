import * as React from 'react';
import classNames from 'classnames/dedupe';
import {ClassValue} from 'classnames/types';

const defaultProps = {
  className: '',
  type: 'text',
};

type Props = React.InputHTMLAttributes<HTMLInputElement> & typeof defaultProps;

class InputControl extends React.Component<Props, {}> {
  public element: React.RefObject<HTMLInputElement>;

  public static defaultProps = defaultProps;

  public constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  public render() {
    const {className, type} = this.props;
    const inputClassNames: ClassValue[] = ['form-control', className];
    if (['hidden', 'range'].indexOf(type) !== -1) {
      inputClassNames.push({'form-control': false});
    }
    if (type === 'range') {
      inputClassNames.push('form-control-range');
    }
    return (
      <input
        {...this.props}
        className={classNames(inputClassNames)}
        ref={this.element}
      />
    );
  }
}

export {Props};
export default InputControl;
