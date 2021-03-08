import * as React from 'react';
import {componentDefaultProps} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import FileControl, {FileControlProps} from './controls/input-file';

const defaultProps = {
  ...componentDefaultProps,
  elementRef: React.createRef<HTMLInputElement>(),
};

type FileProps = FileControlProps & typeof defaultProps;

type State = Record<string, unknown>;

class File extends React.Component<FileProps, State> {
  public static defaultProps = defaultProps;

  // Need to supply a constructor to be recognised as ComponentClass?
  public constructor(props) {
    super(props);
  }

  private handleChange = (event): void => {
    const target = event.currentTarget;
    const {onSetValue, changeCallback, name} = this.props;
    onSetValue(target.files);

    // Note: we sure the result of `target.files` instead of `target.value`.
    // `target.value` is actually pretty useless. A web search for "C:\fakepath\"
    // gives more details.
    changeCallback(name, target.files);
  };

  public render(): JSX.Element {
    const {
      errorMessages,
      help,
      id,
      layout,
      showErrors,
      ...inputProps
    } = this.props;
    Object.keys(componentDefaultProps).forEach((key): void => {
      delete inputProps[key];
    });

    const control = (
      <FileControl
        {...inputProps}
        className="form-control-file"
        id={id}
        onChange={this.handleChange}
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

export {FileProps};
export default File;
