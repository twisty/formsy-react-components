import React, {Component} from 'react';
import PropTypes from 'prop-types';
import commonPropTypes from './common-prop-types';

class TextareaControl extends Component {
  initElementRef = element => {
    this.element = element;
  };

  render() {
    return <textarea {...this.props} ref={this.initElementRef} />;
  }
}

TextareaControl.propTypes = {
  ...commonPropTypes,
  className: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  value: PropTypes.string,
};

TextareaControl.defaultProps = {
  className: 'form-control',
  cols: 0, // React doesn't render the cols attribute if it is zero
  rows: 3,
  value: '',
};

export default TextareaControl;
