import * as React from 'react';
import classNames from 'classnames/dedupe';
import {CommonProps} from './common-prop-types';

type ControlProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type ControlPropsCleaned = Omit<ControlProps, 'id' | 'name'>;

interface TextareaControlProps extends CommonProps, ControlPropsCleaned {
  cols: number;
  rows: number;
  value: string;
}

const defaultProps = {
  cols: 0, // React doesn't render the cols attribute if it is zero
  rows: 3,
  value: '',
};

class TextareaControl extends React.Component<TextareaControlProps, {}> {
  public element: React.RefObject<HTMLTextAreaElement>;

  public static defaultProps = defaultProps;

  public constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  public render() {
    const {className, ...inputProps} = this.props;
    return (
      <textarea
        {...inputProps}
        className={classNames(['form-control', className])}
        ref={this.element}
      />
    );
  }
}

export {TextareaControlProps};
export default TextareaControl;
