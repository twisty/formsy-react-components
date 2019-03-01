import React, {Component} from 'react';
import PropTypes from 'prop-types';
import debounce from '@instructure/debounce';
import {componentPropTypes, componentDefaultProps} from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import TextareaControl from './controls/textarea';

class Textarea extends Component {
  constructor(props) {
    super(props);
    const {
      value,
      onSetValue,
      changeDebounceInterval,
      blurDebounceInterval,
    } = props;
    this.state = {value};
    this.changeDebounced = debounce(onSetValue, changeDebounceInterval);
    this.blurDebounced = debounce(onSetValue, blurDebounceInterval);
  }

  componentWillReceiveProps = nextProps => {
    const {value: stateValue} = this.state;
    const {onSetValue} = this.props;
    const isValueChanging = nextProps.value !== stateValue;
    if (isValueChanging) {
      this.setState({value: nextProps.value});
      onSetValue(nextProps.value);
    }
  };

  handleChange = event => {
    const {updateOnChange, onChange, name} = this.props;
    const {value} = event.currentTarget;
    this.setState({value});
    if (updateOnChange) {
      this.changeDebounced(value);
    }
    onChange(name, value);
  };

  handleBlur = event => {
    const {updateOnBlur, onBlur, name} = this.props;
    const {value} = event.currentTarget;
    this.setState({value});
    if (updateOnBlur) {
      this.changeDebounced.cancel();
      this.blurDebounced(value);
    }
    onBlur(name, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    Object.keys(componentPropTypes).forEach(key => {
      delete inputProps[key];
    });
    delete inputProps.blurDebounceInterval;
    delete inputProps.changeDebounceInterval;
    delete inputProps.updateOnBlur;
    delete inputProps.updateOnChange;

    const {value} = this.state;
    const {layout, id, help, showErrors, errorMessages} = this.props;

    const element = (
      <TextareaControl
        {...inputProps}
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        ref={this.initElementRef}
      />
    );

    if (layout === 'elementOnly') {
      return element;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        {element}
        {help ? <Help help={help} /> : null}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
      </Row>
    );
  }
}

Textarea.propTypes = {
  ...componentPropTypes,
  ...TextareaControl.propTypes,
  blurDebounceInterval: PropTypes.number,
  changeDebounceInterval: PropTypes.number,
  updateOnBlur: PropTypes.bool,
  updateOnChange: PropTypes.bool,
  value: PropTypes.string,
  onBlur: PropTypes.func,
};

Textarea.defaultProps = {
  ...componentDefaultProps,
  updateOnBlur: true,
  updateOnChange: true,
  blurDebounceInterval: 0,
  changeDebounceInterval: 500,
  onBlur: () => {},
};

export default Textarea;
