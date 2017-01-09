import React, { Component, PropTypes } from 'react';
import Formsy from 'formsy-react';
import OptionsProvider from './hoc/options-provider';

class Form extends Component {

    render() {
        let formsyProps = Object.assign({}, this.props);
        delete formsyProps.elementWrapperClassName;
        delete formsyProps.labelClassName;
        delete formsyProps.layout;
        delete formsyProps.rowClassName;
        delete formsyProps.validatePristine;

        return (
            <OptionsProvider
                {...this.props}
            >
                <Formsy.Form
                    {...formsyProps}
                    className={'form-' + this.props.layout}
                    ref="formsy"
                >
                    {this.props.children}
                </Formsy.Form>
            </OptionsProvider>
        );
    }
}

Form.propTypes = {
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']).isRequired,
    children: PropTypes.node
}

Form.defaultProps = {
    layout: 'horizontal'
}

export default Form;
