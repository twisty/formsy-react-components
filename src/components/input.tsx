import * as React from 'react';
import debounce from '../debounce';
import {
  ComponentPropTypes,
  ComponentPropKeys,
  componentDefaultProps,
} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import InputControl, {Props as InputControlProps} from './controls/input';
import InputGroup, {Props as InputGroupProps} from './input-group';
import Row from './row';

type InputControlPropsCleaned = Omit<
  InputControlProps,
  'id' | 'name' | 'className'
>;

type SupportedInputTypes =
  | 'color'
  | 'date'
  | 'datetime'
  | 'datetime-local'
  | 'email'
  | 'hidden'
  | 'month'
  | 'number'
  | 'password'
  | 'range'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface Props
  extends ComponentPropTypes,
    InputControlPropsCleaned,
    InputGroupProps {
  type: SupportedInputTypes;
  value: string;
  blurDebounceInterval: number;
  changeDebounceInterval: number;
  updateOnBlur: boolean;
  updateOnChange: boolean;
  required: boolean;
  blurCallback: (name, value) => {};
  keyDownCallback: (event) => {};
}

interface State {
  value: string;
}

class Input extends React.Component<Props, State> {
  private element;
  private changeDebounced;
  private blurDebounced;

  public static defaultProps = {
    ...componentDefaultProps,
    ...InputGroup.defaultProps,
    type: 'text',
    value: '',
    updateOnBlur: true,
    updateOnChange: true,
    blurDebounceInterval: 0,
    changeDebounceInterval: 500,
    blurCallback: (): void => {},
    keyDownCallback: (): void => {},
    required: false,
  };

  public constructor(props) {
    super(props);
    const {
      value,
      onSetValue,
      changeDebounceInterval,
      blurDebounceInterval,
    } = props;
    this.state = {value: value};
    this.changeDebounced = debounce(onSetValue, changeDebounceInterval);
    this.blurDebounced = debounce(onSetValue, blurDebounceInterval);
  }

  public componentWillReceiveProps = (nextProps): void => {
    const {value: nextValue} = nextProps;
    const {value: stateValue} = this.state;
    const {onSetValue} = this.props;
    const isValueChanging = nextValue !== stateValue;
    if (isValueChanging) {
      this.setState({value: nextValue});
      onSetValue(nextValue);
    }
  };

  private handleChange = (event): void => {
    const {value} = event.currentTarget;
    const {updateOnChange, changeCallback, name} = this.props;
    this.setState({value});
    if (updateOnChange) {
      this.changeDebounced(value);
    }
    changeCallback(name, value);
  };

  private handleBlur = (event): void => {
    const {value} = event.currentTarget;
    const {
      updateOnBlur,
      isPristine,
      blurCallback,
      name,
      value: propValue,
    } = this.props;
    this.setState({value});
    if (updateOnBlur) {
      this.changeDebounced.cancel();
      if (isPristine()) {
        // should update as we have just left a pristine input
        this.blurDebounced(value);
      } else if (propValue !== value) {
        // should update because the value has changed
        this.blurDebounced(value);
      }
    }
    blurCallback(name, value);
  };

  private handleKeyDown = (event): void => {
    const {keyDownCallback} = this.props;
    if (event.key === 'Enter') {
      this.changeDebounced.flush();
    }
    keyDownCallback(event);
  };

  private initElementRef = (control): void => {
    this.element = control ? control.element : null;
  };

  public render(): JSX.Element {
    const inputProps = {...this.props};
    ComponentPropKeys.forEach(
      (key): void => {
        delete inputProps[key];
      },
    );
    delete inputProps.addonAfter;
    delete inputProps.addonBefore;
    delete inputProps.buttonAfter;
    delete inputProps.buttonBefore;
    delete inputProps.blurDebounceInterval;
    delete inputProps.changeDebounceInterval;
    delete inputProps.updateOnBlur;
    delete inputProps.updateOnChange;
    delete inputProps.value;
    delete inputProps.keyDownCallback;
    delete inputProps.blurCallback;

    const {value} = this.state;
    const {
      addonAfter,
      addonBefore,
      buttonAfter,
      buttonBefore,
      errorMessages,
      required,
      help,
      id,
      layout,
      showErrors,
      type,
    } = this.props;

    const markAsInvalid = showErrors && (errorMessages.length > 0 || required);

    let control = (
      <InputControl
        {...inputProps}
        value={value}
        className={markAsInvalid ? 'is-invalid' : ''}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        ref={this.initElementRef}
      />
    );

    if (type === 'hidden') {
      return control;
    }

    if (addonBefore || addonAfter || buttonBefore || buttonAfter) {
      control = <InputGroup {...this.props}>{control}</InputGroup>;
    }

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

export default Input;
