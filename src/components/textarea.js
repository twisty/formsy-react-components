import React, {Component} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import TextareaControl from './controls/textarea';

class Textarea extends Component {
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
      this.blurDebounced(value);
    }
    this.props.onBlur(this.props.name, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });
    delete inputProps.blurDebounceInterval;
    delete inputProps.changeDebounceInterval;
    delete inputProps.updateOnBlur;
    delete inputProps.updateOnChange;

    const element = (
      <TextareaControl
        {...inputProps}
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        ref={this.initElementRef}
      />
    );

    if (this.props.layout === 'elementOnly') {
      return element;
    }

    return (
      <Row {...this.props} htmlFor={this.props.id}>
        {element}
        {this.props.help ? <Help help={this.props.help} /> : null}
        {this.props.showErrors ? (
          <ErrorMessages messages={this.props.errorMessages} />
        ) : null}
      </Row>
    );
  }
}

Textarea.propTypes = {
  ...ComponentCommon.propTypes,
  ...TextareaControl.propTypes,
  blurDebounceInterval: PropTypes.number,
  changeDebounceInterval: PropTypes.number,
  updateOnBlur: PropTypes.bool,
  updateOnChange: PropTypes.bool,
  value: PropTypes.string,
  onBlur: PropTypes.func,
};

Textarea.defaultProps = {
  ...ComponentCommon.defaultProps,
  updateOnBlur: true,
  updateOnChange: true,
  blurDebounceInterval: 0,
  changeDebounceInterval: 500,
  onBlur: () => {},
};

export default Textarea;
