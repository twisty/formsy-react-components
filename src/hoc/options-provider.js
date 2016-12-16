import { Component, PropTypes, Children } from 'react';

class OptionsProvider extends Component {

    getChildContext() {
        return {
            layout:                  this.props.layout,
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
    validatePristine: false,
    rowClassName: '',
    labelClassName: '',
    elementWrapperClassName: ''
};

OptionsProvider.childContextTypes = propTypes;

export default OptionsProvider;
