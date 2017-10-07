import {Component, Children} from 'react';
import PropTypes from 'prop-types';

class OptionsProvider extends Component {
  getChildContext() {
    return {
      layout: this.props.layout,
      validateOnSubmit: this.props.validateOnSubmit,
      validatePristine: this.props.validatePristine,
      rowClassName: this.props.rowClassName,
      labelClassName: this.props.labelClassName,
      elementWrapperClassName: this.props.elementWrapperClassName,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

const classNamesType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.array,
  PropTypes.object,
]);

OptionsProvider.propTypes = {
  layout: PropTypes.string,
  validateOnSubmit: PropTypes.bool,
  validatePristine: PropTypes.bool,
  elementWrapperClassName: classNamesType,
  labelClassName: classNamesType,
  rowClassName: classNamesType,
  children: PropTypes.node.isRequired,
};

OptionsProvider.defaultProps = {
  layout: 'horizontal',
  validateOnSubmit: false,
  validatePristine: false,
  elementWrapperClassName: '',
  labelClassName: '',
  rowClassName: '',
};

const {children, ...childContextTypes} = OptionsProvider.propTypes;
OptionsProvider.childContextTypes = childContextTypes;

export default OptionsProvider;
