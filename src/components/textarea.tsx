import * as React from 'react';
import debounce, {DebouncedFunction} from '../debounce';
import {
  ComponentPropTypes,
  ComponentPropKeys,
  componentDefaultProps,
} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import TextareaControl, {TextareaControlProps} from './controls/textarea';

const defaultProps = {
  ...componentDefaultProps,
  value: '',
  updateOnBlur: true,
  updateOnChange: true,
  blurDebounceInterval: 0,
  changeDebounceInterval: 500,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  blurCallback: (name, value) => {},
};

type Props = ComponentPropTypes & TextareaControlProps & typeof defaultProps;

interface State {
  value: string;
}

class Textarea extends React.Component<Props, State> {
  public element;

  private changeDebounced: DebouncedFunction;
  private blurDebounced: DebouncedFunction;

  public static defaultProps = defaultProps;

  public constructor(props) {
    super(props);
    const {
      value,
      onSetValue,
      changeDebounceInterval,
      blurDebounceInterval,
    } = props;
    this.state = {value};
    this.changeDebounced = debounce(onSetValue, changeDebounceInterval);
    this.blurDebounced = debounce(onSetValue, blurDebounceInterval);
  }

  public componentWillReceiveProps = (nextProps): void => {
    const {value: stateValue} = this.state;
    const {onSetValue} = this.props;
    const isValueChanging = nextProps.value !== stateValue;
    if (isValueChanging) {
      this.setState({value: nextProps.value});
      onSetValue(nextProps.value);
    }
  };

  private handleChange = (event): void => {
    const {updateOnChange, changeCallback, name} = this.props;
    const {value} = event.currentTarget;
    this.setState({value});
    if (updateOnChange) {
      this.changeDebounced(value);
    }
    changeCallback(name, value);
  };

  private handleBlur = (event): void => {
    const {updateOnBlur, blurCallback, name} = this.props;
    const {value} = event.currentTarget;
    this.setState({value});
    if (updateOnBlur) {
      this.changeDebounced.cancel();
      this.blurDebounced(value);
    }
    blurCallback(name, value);
  };

  private initElementRef = (control): void => {
    this.element = control ? control.element : null;
  };

  public render() {
    const {...inputProps} = this.props;
    ComponentPropKeys.forEach((key): void => {
      delete inputProps[key];
    });
    delete inputProps.blurDebounceInterval;
    delete inputProps.changeDebounceInterval;
    delete inputProps.updateOnBlur;
    delete inputProps.updateOnChange;
    delete inputProps.blurCallback;

    const {value} = this.state;
    const {layout, id, help, showErrors, errorMessages} = this.props;

    const element = (
      <TextareaControl
        {...inputProps}
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        ref={this.initElementRef}
      />
    );

    if (layout === 'elementOnly') {
      return element;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        <>
          {element}
          {help ? <Help help={help} /> : null}
          {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
        </>
      </Row>
    );
  }
}

export default Textarea;
