import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {componentPropTypes, componentDefaultProps} from './component-common';
import controlCommonPropTypes from './controls/common-prop-types';
import FormCheckGroup from './form-check-group';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.elements = {};
  }

  handleChange = event => {
    const {value} = event.currentTarget;
    const {onSetValue, onChange, name} = this.props;
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

    const controls = options.map(radio => {
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
    });
    return controls;
  };

  render() {
    return (
      <FormCheckGroup {...this.props}>{this.renderElement()}</FormCheckGroup>
    );
  }
}

RadioGroup.propTypes = {
  ...controlCommonPropTypes,
  ...componentPropTypes,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      value: PropTypes.string,
      label: PropTypes.node,
    }),
  ),
  type: PropTypes.oneOf(['inline', 'stacked']),
};

RadioGroup.defaultProps = {
  ...componentDefaultProps,
  type: 'stacked',
  options: [],
};

export default RadioGroup;
