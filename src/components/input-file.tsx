import * as React from 'react';
import {
  ComponentPropTypes,
  ComponentPropKeys,
  componentDefaultProps,
} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import FileControl, {Props as FileControlProps} from './controls/input-file';

type ComponentPropTypesCleaned = Omit<ComponentPropTypes, 'changeCallback'>;

interface Props extends ComponentPropTypesCleaned, FileControlProps {
  changeCallback: (name: string, files: FileList, value: string) => {};
}

class File extends React.Component<Props, {}> {
  public element;

  public static defaultProps = {
    ...componentDefaultProps,
  };

  private handleChange = (event): void => {
    const target = event.currentTarget;
    const {value} = target;
    const {onSetValue, changeCallback, name} = this.props;
    onSetValue(target.files);

    // We're passing an additional argument to the changeCallback handler here,
    // the 'value' of the field. This value is actually pretty useless,
    // and we're only including here for completeness.
    // An example value would be: "C:\fakepath\name-of-file.txt". Note that
    // if we select multiple files, it only returns a "fakepath" string for
    // the first file.
    // A web search for "C:\fakepath\" gives more details.
    changeCallback(name, target.files, value);
  };

  private initElementRef = control => {
    this.element = control ? control.element : null;
  };

  public render() {
    const inputProps = Object.assign(
      {className: 'form-control-file'},
      this.props,
    );
    ComponentPropKeys.forEach(
      (key): void => {
        delete inputProps[key];
      },
    );

    const {layout, id, showErrors, help, errorMessages} = this.props;

    const control = (
      <FileControl
        {...inputProps}
        onChange={this.handleChange}
        ref={this.initElementRef}
      />
    );

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        <>
          {control}
          {help ? <Help help={help} /> : null}
          {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
        </>
      </Row>
    );
  }
}

export default File;
