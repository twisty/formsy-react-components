import * as React from 'react';
import {CommonProps} from './common-prop-types';

type ControlProps = React.InputHTMLAttributes<HTMLInputElement>;
type ControlPropsCleaned = Omit<ControlProps, 'id' | 'name'>;

interface Props extends CommonProps, ControlPropsCleaned {}

// A file control can only be set to an empty string.
// I think we need to keep this as an uncontrolled component, so we override the
// value.prop.
class FileControl extends React.Component<Props, {}> {
  public element: React.RefObject<HTMLInputElement>;

  public constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  public render(): JSX.Element {
    const {value, ...props} = this.props;
    return <input {...props} type="file" ref={this.element} />;
  }
}

export {Props};
export default FileControl;
