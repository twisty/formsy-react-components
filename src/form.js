import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import Formsy from 'formsy-react';
import OptionsProvider from './hoc/options-provider';

class Form extends Component {
  render() {
    const formsyProps = Object.assign({}, this.props);
    delete formsyProps.elementWrapperClassName;
    delete formsyProps.labelClassName;
    delete formsyProps.layout;
    delete formsyProps.rowClassName;
    delete formsyProps.validatePristine;
    delete formsyProps.validateOnSubmit;

    const refCallback = formsyForm => {
      this.formsyForm = formsyForm;
    };

    const formClassNames = classNames([
      `form-${this.props.layout}`,
      this.props.className,
    ]);

    return (
      <OptionsProvider {...this.props}>
        <Formsy {...formsyProps} className={formClassNames} ref={refCallback}>
          {this.props.children}
        </Formsy>
      </OptionsProvider>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
};

Form.defaultProps = {
  layout: 'horizontal',
  className: '',
};

export default Form;
