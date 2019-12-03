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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  blurCallback: (name: string, value: string): void => {},
  blurDebounceInterval: 0,
  changeDebounceInterval: 500,
  className: '',
  elementRef: React.createRef<HTMLInputElement>(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  value: string;
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
    this.state = {value};
    this.changeDebounced = debounce(onSetValue, changeDebounceInterval);
    this.blurDebounced = debounce(onSetValue, blurDebounceInterval);
  }

  public UNSAFE_componentWillReceiveProps = (nextProps): void => {
    const {value: nextValue} = nextProps;
    const {value: stateValue} = this.state;
    const {onSetValue} = this.props;
    const isValueChanging = nextValue !== stateValue;
    if (isValueChanging) {
      this.setState({value: nextValue});
      onSetValue(nextValue);
    }
  };

  public render(): JSX.Element {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      blurDebounceInterval,
      changeDebounceInterval,
      onSetValue,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      addonAfter,
      addonBefore,
      blurCallback,
      buttonAfter,
      buttonBefore,
      changeCallback,
      className,
      elementRef,
      elementWrapperClassName,
      errorMessages,
      help,
      id,
      isPristine,
      keyDownCallback,
      label,
      labelClassName,
      layout,
      name,
      required,
      rowClassName,
      showErrors,
      type,
      updateOnBlur,
      updateOnChange,
      value: propValue,
      ...passthoughProps
    } = this.props;

    const handleChange = (event): void => {
      const {value} = event.currentTarget;
      this.setState({value: value});
      if (updateOnChange) {
        this.changeDebounced(value);
      }
      changeCallback(name, value);
    };

    const handleBlur = (event): void => {
      const {value} = event.currentTarget;
      this.setState({value: value});
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

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ): void => {
      if (event.key === 'Enter') {
        this.changeDebounced.flush();
      }
      keyDownCallback(event);
    };

    const markAsInvalid = showErrors && (errorMessages.length > 0 || required);

    let control = (
      <InputControl
        {...passthoughProps}
        className={markAsInvalid ? `is-invalid ${className}` : className}
        id={id}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        elementRef={elementRef}
        type={type}
        value={this.state.value}
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
