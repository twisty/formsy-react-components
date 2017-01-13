import { Component, PropTypes, Children } from 'react';

class OptionsProvider extends Component {

    getChildContext() {
        return {
            layout:                  this.props.layout,
            validateOnSubmit:        this.props.validateOnSubmit,
            validatePristine:        this.props.validatePristine,
            rowClassName:            this.props.rowClassName,
            labelClassName:          this.props.labelClassName,
            elementWrapperClassName: this.props.elementWrapperClassName
        };
    }

    render() {
        return Children.only(this.props.children);
    }
}

let classNamesType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
]);

let propTypes = {
    layout:                  PropTypes.string.isRequired,
    validateOnSubmit:        PropTypes.bool.isRequired,
    validatePristine:        PropTypes.bool.isRequired,
    elementWrapperClassName: classNamesType,
    labelClassName:          classNamesType,
    rowClassName:            classNamesType
};

OptionsProvider.propTypes = {
    ...propTypes,
    children: PropTypes.node
};

OptionsProvider.defaultProps = {
    layout: 'horizontal',
    validateOnSubmit: false,
    validatePristine: false,
    rowClassName: '',
    labelClassName: '',
    elementWrapperClassName: ''
};

OptionsProvider.childContextTypes = propTypes;

export default OptionsProvider;
