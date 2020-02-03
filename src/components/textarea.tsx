import * as React from 'react';
import debounce, {DebouncedFunction} from '../debounce';
import {componentDefaultProps} from './component-common';
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
  cols: 0,
  rows: 3,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  blurCallback: (name: string, value: string): void => {},
};

type TextareaProps = TextareaControlProps & typeof defaultProps;

interface State {
  value: string;
}

class Textarea extends React.Component<TextareaProps, State> {
  public static defaultProps = defaultProps;

  private changeDebounced: DebouncedFunction;
  private blurDebounced: DebouncedFunction;

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

  public UNSAFE_componentWillReceiveProps = (nextProps): void => {
    const {value: nextValue} = nextProps;
    const {value: stateValue} = this.state;
    const isValueChanging = nextValue !== stateValue;
    if (isValueChanging) {
      const {onSetValue} = this.props;
      this.setState({value: nextValue});
      onSetValue(nextValue);
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

  public render(): JSX.Element {
    const {...inputProps} = this.props;
    Object.keys(componentDefaultProps).forEach((key): void => {
      delete inputProps[key];
    });
    delete inputProps.blurDebounceInterval;
    delete inputProps.changeDebounceInterval;
    delete inputProps.updateOnBlur;
    delete inputProps.updateOnChange;
    delete inputProps.blurCallback;

    const {value} = this.state;
    const {
      className,
      elementRef,
      errorMessages,
      help,
      id,
      layout,
      name,
      required,
      showErrors,
    } = this.props;

    const markAsInvalid = showErrors && (errorMessages.length > 0 || required);

    const element = (
      <TextareaControl
        {...inputProps}
        className={markAsInvalid ? `is-invalid ${className}` : className}
        id={id}
        value={value}
        name={name}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        elementRef={elementRef}
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
