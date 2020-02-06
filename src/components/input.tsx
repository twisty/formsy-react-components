import * as React from 'react';
import debounce from '../debounce';
import {componentDefaultProps} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import InputControl, {InputControlProps} from './controls/input';
import InputGroup, {InputGroupProps} from './input-group';
import Row from './row';

type InputControlPropsCleaned = Omit<
  InputControlProps,
  'required' | 'value' | 'className' | 'elementRef' | 'id' | 'name' | 'type'
>;

type InputGroupPropsCleaned = Omit<InputGroupProps, 'children'>;

type SupportedInputType =
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

const defaultProps = {
  ...componentDefaultProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  blurCallback: (name: string, value: string): void => {},
  blurDebounceInterval: 0,
  changeDebounceInterval: 500,
  className: '',
  elementRef: React.createRef<HTMLInputElement>(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  keyDownCallback: (event: React.KeyboardEvent<HTMLInputElement>): void => {},
  required: false,
  type: 'text' as SupportedInputType,
  updateOnBlur: true,
  updateOnChange: true,
  value: '',
};

type InputProps = InputControlPropsCleaned &
  InputGroupPropsCleaned &
  typeof componentDefaultProps &
  InputGroupProps &
  typeof defaultProps & {
    name: string;
  };

interface State {
  currentValue: string;
  incomingPropValue: string;
  valueIsChanging: boolean;
}

class Input extends React.Component<InputProps, State> {
  public static defaultProps = defaultProps;

  public changeDebounced;
  public blurDebounced;

  public constructor(props) {
    super(props);
    const {
      value,
      onSetValue,
      changeDebounceInterval,
      blurDebounceInterval,
    } = props;
    this.state = {
      currentValue: value,
      incomingPropValue: value,
      valueIsChanging: false,
    };
    this.changeDebounced = debounce(onSetValue, changeDebounceInterval);
    this.blurDebounced = debounce(onSetValue, blurDebounceInterval);
  }

  public static getDerivedStateFromProps(props, state): null | Partial<State> {
    const {value: incomingPropValue} = props;
    if (incomingPropValue !== state.incomingPropValue) {
      return {
        valueIsChanging: true,
        incomingPropValue,
      };
    }
    return null;
  }

  public shouldComponentUpdate(nextProps, nextState): boolean {
    const {valueIsChanging, incomingPropValue} = nextState;
    if (valueIsChanging === true) {
      this.setState({
        valueIsChanging: false,
        currentValue: incomingPropValue,
      });
      this.props.onSetValue(incomingPropValue);
      return false;
    }
    return true;
  }

  public handleBlur = (event): void => {
    const {value} = event.currentTarget;
    const {
      updateOnBlur,
      isPristine,
      value: propValue,
      blurCallback,
    } = this.props;
    this.setState({currentValue: value});
    if (updateOnBlur) {
      this.changeDebounced.cancel();
      if (isPristine) {
        // should update as we have just left a pristine input
        this.blurDebounced(value);
      } else if (propValue !== value) {
        // should update because the value has changed
        this.blurDebounced(value);
      }
    }
    blurCallback(name, value);
  };

  public handleChange = (event): void => {
    const {value} = event.currentTarget;
    const {updateOnChange, changeCallback} = this.props;
    this.setState({currentValue: value});
    if (updateOnChange) {
      this.changeDebounced(value);
    }
    changeCallback(name, value);
  };

  public handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    const {keyDownCallback} = this.props;
    if (event.key === 'Enter') {
      this.changeDebounced.flush();
    }
    keyDownCallback(event);
  };

  public render(): JSX.Element {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      blurCallback,
      blurDebounceInterval,
      changeCallback,
      changeDebounceInterval,
      isPristine,
      keyDownCallback,
      name,
      onSetValue,
      updateOnBlur,
      updateOnChange,
      value,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      addonAfter,
      addonBefore,
      buttonAfter,
      buttonBefore,
      className,
      elementRef,
      elementWrapperClassName,
      errorMessages,
      help,
      id,
      label,
      labelClassName,
      layout,
      required,
      rowClassName,
      showErrors,
      type,
      ...passthoughProps
    } = this.props;

    const markAsInvalid = showErrors && (errorMessages.length > 0 || required);

    let control = (
      <InputControl
        {...passthoughProps}
        className={markAsInvalid ? `is-invalid ${className}` : className}
        id={id}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        elementRef={elementRef}
        type={type}
        value={this.state.currentValue}
      />
    );

    if (type === 'hidden') {
      return control;
    }

    const inputGroupProps = {
      addonAfter,
      addonBefore,
      buttonAfter,
      buttonBefore,
    };

    const rowProps = {
      elementWrapperClassName,
      labelClassName,
      rowClassName,
      label,
      errorMessages,
      htmlFor: id,
      layout,
      required,
      showErrors,
    };

    if (addonBefore || addonAfter || buttonBefore || buttonAfter) {
      control = <InputGroup {...inputGroupProps}>{control}</InputGroup>;
    }

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...rowProps}>
        <>
          {control}
          {help ? <Help help={help} /> : null}
          {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
        </>
      </Row>
    );
  }
}

export default Input; // as React.ComponentClass<InputProps>;
