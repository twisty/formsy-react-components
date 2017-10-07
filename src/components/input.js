import React, {Component} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Icon from './icon';
import InputControl from './controls/input';
import InputGroup from './input-group';
import Row from './row';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value};
    this.changeDebounced = debounce(
      props.onSetValue,
      props.changeDebounceInterval,
    );
    this.blurDebounced = debounce(props.onSetValue, props.blurDebounceInterval);
  }

  componentWillReceiveProps = nextProps => {
    const isValueChanging = nextProps.value !== this.state.value;
    if (isValueChanging) {
      this.setState({value: nextProps.value});
      this.props.onSetValue(nextProps.value);
    }
  };

  handleChange = event => {
    const {value} = event.currentTarget;
    this.setState({value});
    if (this.props.updateOnChange) {
      this.changeDebounced(value);
    }
    this.props.onChange(this.props.name, value);
  };

  handleBlur = event => {
    const {value} = event.currentTarget;
    this.setState({value});
    if (this.props.updateOnBlur) {
      this.changeDebounced.cancel();
      if (this.props.isPristine()) {
        // should update as we have just left a pristine input
        this.blurDebounced(value);
      } else if (this.props.value !== value) {
        // should update because the value has changed
        this.blurDebounced(value);
      }
    }
    this.props.onBlur(this.props.name, value);
  };

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.changeDebounced.flush();
    }
    this.props.onKeyDown(event);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });
    delete inputProps.addonAfter;
    delete inputProps.addonBefore;
    delete inputProps.buttonAfter;
    delete inputProps.buttonBefore;
    delete inputProps.blurDebounceInterval;
    delete inputProps.changeDebounceInterval;
    delete inputProps.updateOnBlur;
    delete inputProps.updateOnChange;
    delete inputProps.value;
    delete inputProps.onBlur;

    let control = (
      <InputControl
        {...inputProps}
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        ref={this.initElementRef}
      />
    );

    if (this.props.type === 'hidden') {
      return control;
    }

    if (
      this.props.addonBefore ||
      this.props.addonAfter ||
      this.props.buttonBefore ||
      this.props.buttonAfter
    ) {
      control = <InputGroup {...this.props}>{control}</InputGroup>;
    }

    if (this.props.layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={this.props.id}>
        {control}
        {this.props.showErrors ? (
          <Icon symbol="remove" className="form-control-feedback" />
        ) : null}
        {this.props.help ? <Help help={this.props.help} /> : null}
        {this.props.showErrors ? (
          <ErrorMessages messages={this.props.errorMessages} />
        ) : null}
      </Row>
    );
  }
}

const [...inputGroupPropTypes] = InputControl.propTypes;
delete inputGroupPropTypes.children;

Input.propTypes = {
  ...InputControl.propTypes,
  ...inputGroupPropTypes,
  ...ComponentCommon.propTypes,
  blurDebounceInterval: PropTypes.number,
  changeDebounceInterval: PropTypes.number,
  type: PropTypes.oneOf([
    'color',
    'date',
    'datetime',
    'datetime-local',
    'email',
    'hidden',
    'month',
    'number',
    'password',
    'range',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
  updateOnBlur: PropTypes.bool,
  updateOnChange: PropTypes.bool,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
};

Input.defaultProps = {
  ...ComponentCommon.defaultProps,
  ...InputGroup.defaultProps,
  type: 'text',
  value: '',
  updateOnBlur: true,
  updateOnChange: true,
  blurDebounceInterval: 0,
  changeDebounceInterval: 500,
  onBlur: () => {},
  onKeyDown: () => {},
};

export default Input;
