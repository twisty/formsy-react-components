import React, {Component} from 'react';
import PropTypes from 'prop-types';
import controlCommonPropTypes from './controls/common-prop-types';
import {componentPropTypes, componentDefaultProps} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

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
    const {options, value, disabled} = this.props;
    const controls = options.map(checkbox => {
      const checked = value.indexOf(checkbox.value) !== -1;
      const isDisabled = checkbox.disabled || disabled;
      return (
        <div className="checkbox" key={checkbox.value}>
          <label>
            <input
              ref={input => {
                this.elements[checkbox.value] = input;
              }}
              checked={checked}
              type="checkbox"
              value={checkbox.value}
              onChange={this.handleChange}
              disabled={isDisabled}
            />{' '}
            {checkbox.label}
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
