import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {componentPropTypes, componentDefaultProps} from './component-common';
import controlCommonPropTypes from './controls/common-prop-types';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

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
    const {options, value, disabled, type} = this.props;
    const controls = options.map(radio => {
      const checked = value === radio.value;
      const isDisabled = radio.disabled || disabled;
      const className = `radio${isDisabled ? ' disabled' : ''}`;
      if (type === 'inline') {
        return (
          <label className="radio-inline" key={radio.value}>
            <input
              ref={input => {
                this.elements[radio.value] = input;
              }}
              checked={checked}
              type="radio"
              value={radio.value}
              onChange={this.handleChange}
              disabled={isDisabled}
            />{' '}
            {radio.label}
          </label>
        );
      }
      return (
        <div className={className} key={radio.value}>
          <label>
            <input
              ref={input => {
                this.elements[radio.value] = input;
              }}
              checked={checked}
              type="radio"
              value={radio.value}
              onChange={this.handleChange}
              disabled={isDisabled}
            />{' '}
            {radio.label}
          </label>
        </div>
      );
    });
    return controls;
  };

  render() {
    const element = this.renderElement();
    const {layout, help, showErrors, errorMessages} = this.props;
    if (layout === 'elementOnly') {
      return <div>{element}</div>;
    }

    return (
      <Row {...this.props} fakeLabel>
        {element}
        {help ? <Help help={help} /> : null}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
      </Row>
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
