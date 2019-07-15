import * as React from 'react';
import {CommonProps} from './common-prop-types';

type ControlProps = React.InputHTMLAttributes<HTMLInputElement>;
type ControlPropsCleaned = Omit<ControlProps, 'id' | 'name'>;

interface FileControlProps extends CommonProps, ControlPropsCleaned {
  elementRef: React.RefObject<HTMLInputElement>;
}

// A file control can only be set to an empty string.
// I think we need to keep this as an uncontrolled component, so we override the
// value.prop.
class FileControl extends React.Component<FileControlProps, {}> {
  public static defaultProps = {
    elementRef: React.createRef<HTMLInputElement>(),
  };
  public render(): React.ReactElement<HTMLInputElement> {
    const {elementRef, ...props} = this.props;
    delete props.value;

    return <input {...props} type="file" ref={elementRef} />;
  }
}

export {FileControlProps};
export default FileControl;
