import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ControlCommon from './controls/control-common';
import ComponentCommon from './component-common';
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
    const {options, name} = this.props;
    const checkedOptions = options.filter(
      option => this.elements[option.value].checked,
    );
    const value = checkedOptions.map(option => option.value);
    this.props.onSetValue(value);
    this.props.onChange(name, value);
  };

  renderElement = () => {
    const controls = this.props.options.map(checkbox => {
      const checked = this.props.value.indexOf(checkbox.value) !== -1;
      const disabled = checkbox.disabled || this.props.disabled;
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
              disabled={disabled}
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

    if (this.props.layout === 'elementOnly') {
      return <div>{element}</div>;
    }

    return (
      <Row {...this.props} fakeLabel>
        {element}
        {this.props.help ? <Help help={this.props.help} /> : null}
        {this.props.showErrors ? (
          <ErrorMessages messages={this.props.errorMessages} />
        ) : null}
      </Row>
    );
  }
}

CheckboxGroup.propTypes = {
  ...ControlCommon.propTypes,
  ...ComponentCommon.propTypes,
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
  ...ComponentCommon.defaultProps,
  options: [],
  value: [],
};

export default CheckboxGroup;
