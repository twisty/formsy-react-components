import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import commonPropTypes from './common-prop-types';

class InputControl extends Component {
  initElementRef = element => {
    this.element = element;
  };

  render() {
    const {className, type} = this.props;
    const inputClassNames = ['form-control', className];
    if (['hidden', 'range'].indexOf(type) !== -1) {
      inputClassNames.push({'form-control': false});
    }
    if (type === 'range') {
      inputClassNames.push('form-control-range');
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
  className: PropTypes.string,
};

InputControl.propTypes = propTypes;

InputControl.defaultProps = {
  className: '',
  type: 'text',
};

export default InputControl;
