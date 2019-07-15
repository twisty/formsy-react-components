import * as React from 'react';
import {componentDefaultProps} from './component-common';
import {CommonProps as ControlCommonProps} from './controls/common-prop-types';
import FormCheckGroup from './form-check-group';

type ControlCommonPropsCleaned = Omit<ControlCommonProps, 'id' | 'name'>;

type RadioLayoutType = 'inline' | 'stacked';

interface Option {
  disabled?: boolean;
  label: React.ReactNode;
  value: string;
}

const defaultProps = {
  ...componentDefaultProps,
  options: [] as Option[],
  required: false,
  type: 'stacked' as RadioLayoutType,
  value: '',
};

type RadioGroupProps = ControlCommonPropsCleaned &
  typeof defaultProps & {
    name: string;
  };

class RadioGroup extends React.Component<RadioGroupProps, {}> {
  public elements = {};

  public static defaultProps = defaultProps;

  public constructor(props) {
    super(props);
  }

  private handleChange = (event): void => {
    const {value} = event.currentTarget;
    const {onSetValue, changeCallback, name} = this.props;
    onSetValue(value);
    changeCallback(name, value);
  };

  private renderElement = (): JSX.Element[] => {
    const {
      disabled,
      errorMessages,
      id,
      name,
      options,
      required,
      showErrors,
      type,
      value,
    } = this.props;

    const markAsInvalid = showErrors && (errorMessages.length > 0 || required);

    const className = `form-check${
      type === 'inline' ? ' form-check-inline' : ''
    }`;

    const inputClassName = `form-check-input${
      markAsInvalid ? ' is-invalid' : ''
    }`;

    const controls = options.map(radio => {
      const checked = value === radio.value;
      const isDisabled = radio.disabled || disabled;
      const inputId = `${id}--${radio.value}`;
      const ref = React.createRef<HTMLInputElement>();
      this.elements[radio.value] = ref;
      return (
        <div className={className} key={radio.value}>
          <input
            ref={ref}
            checked={checked}
            type="radio"
            value={radio.value}
            onChange={this.handleChange}
            disabled={isDisabled}
            className={inputClassName}
            name={name}
            id={inputId}
            required={required}
          />
          <label className="form-check-label" htmlFor={inputId}>
            {radio.label}
          </label>
        </div>
      );
    });
    return controls;
  };

  public render(): JSX.Element {
    return (
      <FormCheckGroup {...this.props}>
        <>{this.renderElement()}</>
      </FormCheckGroup>
    );
  }
}

export default RadioGroup;
