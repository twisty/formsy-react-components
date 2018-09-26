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
    const {value: stateValue} = this.state;
    const {onSetValue} = this.props;
    const isValueChanging = nextProps.value !== stateValue;
    if (isValueChanging) {
      this.setState({value: nextProps.value});
      onSetValue(nextProps.value);
    }
  };

  handleChange = event => {
    const {value} = event.currentTarget;
    const {updateOnChange, onChange, name} = this.props;
    this.setState({value});
    if (updateOnChange) {
      this.changeDebounced(value);
    }
    onChange(name, value);
  };

  handleBlur = event => {
    const {value} = event.currentTarget;
    const {
      updateOnBlur,
      isPristine,
      onBlur,
      name,
      value: propValue,
    } = this.props;
    this.setState({value});
    if (updateOnBlur) {
      this.changeDebounced.cancel();
      if (isPristine()) {
        // should update as we have just left a pristine input
        this.blurDebounced(value);
      } else if (propValue !== value) {
        // should update because the value has changed
        this.blurDebounced(value);
      }
    }
    onBlur(name, value);
  };

  handleKeyDown = event => {
    const {onKeyDown} = this.props;
    if (event.key === 'Enter') {
      this.changeDebounced.flush();
    }
    onKeyDown(event);
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

    const {value} = this.state;
    const {
      type,
      addonBefore,
      addonAfter,
      buttonBefore,
      buttonAfter,
      layout,
      id,
      showErrors,
      help,
      errorMessages,
    } = this.props;

    let control = (
      <InputControl
        {...inputProps}
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        ref={this.initElementRef}
      />
    );

    if (type === 'hidden') {
      return control;
    }

    if (addonBefore || addonAfter || buttonBefore || buttonAfter) {
      control = <InputGroup {...this.props}>{control}</InputGroup>;
    }

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        {control}
        {showErrors ? (
          <Icon symbol="remove" className="form-control-feedback" />
        ) : null}
        {help ? <Help help={help} /> : null}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
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
