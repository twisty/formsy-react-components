import { PropTypes } from 'react';

const ParentContextMixin = {

    childContextTypes: {
        layout: PropTypes.string.isRequired,
        validatePristine: PropTypes.bool.isRequired,
        rowClassName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object
        ]),
        labelClassName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object
        ]),
        elementWrapperClassName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object
        ])
    },

    getChildContext: function() {
        return {
            layout: this.props.layout || 'horizontal',
            validatePristine: this.props.validatePristine || false,
            rowClassName: this.props.rowClassName || '',
            labelClassName: this.props.labelClassName || '',
            elementWrapperClassName: this.props.elementWrapperClassName || ''
        };
    },

    getLayoutClassName: function() {
        return 'form-' + this.getChildContext().layout;
    }

};

export default ParentContextMixin;
