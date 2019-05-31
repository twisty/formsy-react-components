import * as React from 'react';
import {ComponentPropTypes, componentDefaultProps} from './component-common';
import {CommonProps as ControlCommonProps} from './controls/common-prop-types';
import FormCheckGroup from './form-check-group';

type ControlCommonPropsCleaned = Omit<ControlCommonProps, 'id' | 'name'>;

interface Props extends ComponentPropTypes, ControlCommonPropsCleaned {
  options: {
    disabled: boolean;
    value: string;
    label: React.ReactNode;
  }[];
  required: boolean;
  value: string;
  type: 'inline' | 'stacked';
}

class RadioGroup extends React.Component<Props, {}> {
  public elements;

  public static defaultProps = {
    ...componentDefaultProps,
    type: 'stacked',
    options: [],
  };

  public constructor(props) {
    super(props);
    this.elements = {};
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

    const controls = options.map(
      (radio): JSX.Element => {
        const checked = value === radio.value;
        const isDisabled = radio.disabled || disabled;
        const inputId = `${id}--${radio.value}`;
        return (
          <div className={className} key={radio.value}>
            <input
              ref={input => {
                this.elements[radio.value] = input;
              }}
              checked={checked}
              type="radio"
              value={radio.value}
              onChange={this.handleChange}
              disabled={isDisabled}
              className={inputClassName}
              name={id}
              id={inputId}
              required={required}
            />
            <label className="form-check-label" htmlFor={inputId}>
              {radio.label}
            </label>
          </div>
        );
      },
    );
    return controls;
  };

  public render(): FormCheckGroup {
    return (
      <FormCheckGroup {...this.props}>{this.renderElement()}</FormCheckGroup>
    );
  }
}

export default RadioGroup;
