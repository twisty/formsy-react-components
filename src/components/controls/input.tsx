import * as React from 'react';
import classNames from 'classnames/dedupe';
import {ClassNamesType} from '../../form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  className: string;
}

class InputControl extends React.Component<Props, {}> {
  public element: React.RefObject<HTMLInputElement>;

  public static defaultProps = {
    className: '',
    type: 'text',
  };

  public constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  public render(): JSX.Element {
    const {className, type} = this.props;
    const inputClassNames: ClassNamesType[] = ['form-control', className];
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
