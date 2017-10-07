import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ComponentCommon from './component-common';
import ControlCommon from './controls/control-common';
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
    this.props.onSetValue(value);
    this.props.onChange(this.props.name, value);
  };

  renderElement = () => {
    const controls = this.props.options.map(radio => {
      const checked = this.props.value === radio.value;
      const disabled = radio.disabled || this.props.disabled;
      const className = `radio${disabled ? ' disabled' : ''}`;
      if (this.props.type === 'inline') {
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
              disabled={disabled}
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
              disabled={disabled}
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

RadioGroup.propTypes = {
  ...ControlCommon.propTypes,
  ...ComponentCommon.propTypes,
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
  ...ComponentCommon.defaultProps,
  type: 'stacked',
  options: [],
};

export default RadioGroup;
