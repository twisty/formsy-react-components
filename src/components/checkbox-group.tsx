import * as React from 'react';
import {componentDefaultProps} from './component-common';
import {CommonProps} from './controls/common-prop-types';
import FormCheckGroup from './form-check-group';

type CommonPropsCleaned = Omit<CommonProps, 'id' | 'name'>;

interface Option {
  disabled?: boolean;
  value: string;
  label: string;
}

type CheckboxLayout = 'inline' | 'stacked';

const defaultProps = {
  ...componentDefaultProps,
  options: [] as Option[],
  value: [] as string[],
  type: 'stacked' as CheckboxLayout,
  required: false,
};

type CheckboxGroupProps = typeof defaultProps &
  CommonPropsCleaned & {
    name: string;
  };

class CheckboxGroup extends React.Component<CheckboxGroupProps, {}> {
  public static defaultProps = defaultProps;

  public elements = {};

  // Constructor must be present to determine type of component?
  public constructor(props) {
    super(props);
  }

  // Returns an array of the values of all checked items.
  private handleChange = (): void => {
    const {options, name, onSetValue, changeCallback} = this.props;
    const checkedOptions = options.filter(
      (option): boolean => this.elements[option.value].checked,
    );
    const value = checkedOptions.map((option): string => option.value);
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
      name,
      value,
    } = this.props;

    const markAsInvalid = showErrors && (errorMessages.length > 0 || required);

    const className = `form-check${
      type === 'inline' ? ' form-check-inline' : ''
    }`;

    const inputClassName = `form-check-input${
      markAsInvalid ? ' is-invalid' : ''
    }`;

    const controls = options.map(checkbox => {
      const checked = value.indexOf(checkbox.value) !== -1;
      const isDisabled = checkbox.disabled || disabled;
      const inputId = `${id}--${checkbox.value}`;
      return (
        <div className={className} key={checkbox.value}>
          <input
            ref={(input): void => {
              this.elements[checkbox.value] = input;
            }}
            className={inputClassName}
            checked={checked}
            type="checkbox"
            value={checkbox.value}
            onChange={this.handleChange}
            disabled={isDisabled}
            name={name}
            id={inputId}
            required={required}
          />
          <label className="form-check-label" htmlFor={inputId}>
            {checkbox.label}
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

export default CheckboxGroup;
