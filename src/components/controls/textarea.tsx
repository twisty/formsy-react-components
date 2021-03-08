import * as React from 'react';
import classNames from 'classnames/dedupe'; // eslint-disable-line import/default
import {CommonProps} from './common-prop-types';

type ControlProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type ControlPropsCleaned = Omit<ControlProps, 'id' | 'name'>;

interface TextareaControlProps extends CommonProps, ControlPropsCleaned {
  cols: number;
  rows: number;
  value: string;
  elementRef: React.RefObject<HTMLTextAreaElement>;
}

const defaultProps = {
  cols: 0, // React doesn't render the cols attribute if it is zero
  rows: 3,
  value: '',
  elementRef: React.createRef<HTMLTextAreaElement>(),
};

type State = Record<string, unknown>;

class TextareaControl extends React.Component<TextareaControlProps, State> {
  public static defaultProps = defaultProps;

  public constructor(props) {
    super(props);
  }

  public render(): JSX.Element {
    const {className, elementRef, ...inputProps} = this.props;
    return (
      <textarea
        {...inputProps}
        className={classNames(['form-control', className])}
        ref={elementRef}
      />
    );
  }
}

export {TextareaControlProps};
export default TextareaControl;
