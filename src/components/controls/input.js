import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import commonPropTypes from './common-prop-types';

class InputControl extends Component {
  initElementRef = element => {
    this.element = element;
  };

  render() {
    const {className, hasErrors, type} = this.props;
    const inputClassNames = [className];
    if (['hidden', 'range'].indexOf(type) !== -1) {
      inputClassNames.push({'form-control': false});
    }
    if (type === 'range') {
      inputClassNames.push('form-control-range');
    }
    if (hasErrors) {
      inputClassNames.push('is-invalid');
    }
    return (
      <input
        {...this.props}
        className={classNames(inputClassNames)}
        ref={this.initElementRef}
      />
    );
  }
}

export const propTypes = {
  ...commonPropTypes,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  hasErrors: PropTypes.boolean,
  className: PropTypes.string,
};

InputControl.propTypes = propTypes;

InputControl.defaultProps = {
  className: 'form-control',
  hasErrors: false,
  type: 'text',
};

export default InputControl;
