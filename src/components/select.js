import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import SelectControl from './controls/select';

class Select extends Component {
  handleChange = event => {
    const target = event.currentTarget;
    const {multiple, onSetValue, onChange, name} = this.props;
    let value;
    if (multiple) {
      value = Array.from(target.options)
        .filter(option => option.selected)
        .map(option => option.value);
    } else {
      ({value} = target);
    }
    onSetValue(value);
    onChange(name, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    const control = (
      <SelectControl
        {...inputProps}
        onChange={this.handleChange}
        ref={this.initElementRef}
      />
    );

    const {layout, id, help, showErrors, errorMessages} = this.props;

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        {control}
        {help ? <Help help={help} /> : null}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
      </Row>
    );
  }
}

Select.propTypes = {
  ...SelectControl.propTypes,
  ...ComponentCommon.propTypes,
  multiple: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      group: PropTypes.string,
    }),
  ),
};

Select.defaultProps = {
  ...ComponentCommon.defaultProps,
  options: [],
};

export default Select;
