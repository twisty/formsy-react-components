import React, {Component} from 'react';
import PropTypes from 'prop-types';
import controlCommonPropTypes from './controls/common-prop-types';
import {componentPropTypes, componentDefaultProps} from './component-common';
import FormCheckGroup from './form-check-group';

class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.elements = {};
  }

  // Returns an array of the values of all checked items.
  handleChange = () => {
    const {options, name, onSetValue, onChange} = this.props;
    const checkedOptions = options.filter(
      option => this.elements[option.value].checked,
    );
    const value = checkedOptions.map(option => option.value);
    onSetValue(value);
    onChange(name, value);
  };

  renderElement = () => {
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

    const controls = options.map(checkbox => {
      const checked = value.indexOf(checkbox.value) !== -1;
      const isDisabled = checkbox.disabled || disabled;
      const inputId = `${id}--${checkbox.value}`;
      return (
        <div className={className} key={checkbox.value}>
          <input
            ref={input => {
              this.elements[checkbox.value] = input;
            }}
            className={inputClassName}
            checked={checked}
            type="checkbox"
            value={checkbox.value}
            onChange={this.handleChange}
            disabled={isDisabled}
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

  render() {
    return (
      <FormCheckGroup {...this.props}>{this.renderElement()}</FormCheckGroup>
    );
  }
}

CheckboxGroup.propTypes = {
  ...controlCommonPropTypes,
  ...componentPropTypes,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      value: PropTypes.string,
      label: PropTypes.string,
      key: PropTypes.string,
    }),
  ),
  value: PropTypes.arrayOf(PropTypes.string),
};

CheckboxGroup.defaultProps = {
  ...componentDefaultProps,
  options: [],
  value: [],
};

export default CheckboxGroup;
