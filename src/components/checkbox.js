import React, {Component} from 'react';
import PropTypes from 'prop-types';
import controlCommonPropTypes from './controls/common-prop-types';
import {componentPropTypes, componentDefaultProps} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

class Checkbox extends Component {
  handleChange = event => {
    const value = event.currentTarget.checked;
    const {onSetValue, onChange, name} = this.props;
    onSetValue(value);
    onChange(name, value);
  };

  initElementRef = element => {
    this.element = element;
  };

  renderElement = () => {
    const inputProps = Object.assign({}, this.props);
    Object.keys(componentPropTypes).forEach(key => {
      delete inputProps[key];
    });
    delete inputProps.valueLabel;
    delete inputProps.label;
    const {value, valueLabel} = this.props;
    return (
      <div className="form-check">
        <input
          {...inputProps}
          className="form-check-input"
          type="checkbox"
          checked={value === true}
          onChange={this.handleChange}
          ref={this.initElementRef}
        />
        <label className="form-check-label" htmlFor={inputProps.id}>
          {valueLabel}
        </label>
      </div>
    );
  };

  render() {
    const element = this.renderElement();
    const {
      layout,
      id,
      help,
      showErrors,
      errorMessages,
      labelClassName,
    } = this.props;

    if (layout === 'elementOnly') {
      return element;
    }

    return (
      <Row
        {...this.props}
        fakeLabel
        htmlFor={id}
        labelClassName={['pt-0', labelClassName]}>
        {element}
        {help ? <Help help={help} /> : null}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
      </Row>
    );
  }
}

Checkbox.propTypes = {
  ...controlCommonPropTypes,
  ...componentPropTypes,
  value: PropTypes.bool,
  valueLabel: PropTypes.string,
};

Checkbox.defaultProps = {
  ...componentDefaultProps,
  value: false,
  valueLabel: '',
};

export default Checkbox;
