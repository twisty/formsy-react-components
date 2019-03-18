import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import Formsy from 'formsy-react';
import FrcContext from './context/frc';

class Form extends Component {
  render() {
    const {
      children,
      className,
      elementWrapperClassName,
      labelClassName,
      layout,
      rowClassName,
      validateOnSubmit,
      validatePristine,
      ...formsyProps
    } = this.props;

    const contextProps = {
      elementWrapperClassName,
      labelClassName,
      layout,
      rowClassName,
      validateOnSubmit,
      validatePristine,
    };

    const refCallback = formsyForm => {
      this.formsyForm = formsyForm;
    };

    const formClassNames = classNames([`form-${layout}`, className]);

    return (
      <FrcContext.Provider value={contextProps}>
        <Formsy {...formsyProps} className={formClassNames} ref={refCallback}>
          {children}
        </Formsy>
      </FrcContext.Provider>
    );
  }
}

const classNamesType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.array,
  PropTypes.object,
]);

Form.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  validateOnSubmit: PropTypes.bool,
  validatePristine: PropTypes.bool,
  elementWrapperClassName: classNamesType,
  labelClassName: classNamesType,
  rowClassName: classNamesType,
};

Form.defaultProps = {
  layout: 'horizontal',
  className: '',
  elementWrapperClassName: '',
  labelClassName: '',
  rowClassName: '',
  validateOnSubmit: false,
  validatePristine: false,
};

export default Form;
