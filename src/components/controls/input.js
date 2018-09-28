import React, {Component} from 'react';
import PropTypes from 'prop-types';
import commonPropTypes from './common-prop-types';

class InputControl extends Component {
  initElementRef = element => {
    this.element = element;
  };

  render() {
    let {className} = this.props;
    const {type} = this.props;
    if (['hidden', 'range'].indexOf(type) !== -1) {
      className = null;
    }
    return (
      <input {...this.props} className={className} ref={this.initElementRef} />
    );
  }
}

export const propTypes = {
  ...commonPropTypes,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

InputControl.propTypes = propTypes;

InputControl.defaultProps = {
  className: 'form-control',
  type: 'text',
};

export default InputControl;
