import {Component, Children} from 'react';
import PropTypes from 'prop-types';

class OptionsProvider extends Component {
  getChildContext() {
    const {
      layout,
      validateOnSubmit,
      validatePristine,
      rowClassName,
      labelClassName,
      elementWrapperClassName,
    } = this.props;
    return {
      layout,
      validateOnSubmit,
      validatePristine,
      rowClassName,
      labelClassName,
      elementWrapperClassName,
    };
  }

  render() {
    const {children} = this.props;
    return Children.only(children);
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
