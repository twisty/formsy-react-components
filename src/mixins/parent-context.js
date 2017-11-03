'use strict';

var React = require('react');
var PropTypes = require('prop-types');

module.exports = {

    childContextTypes: {
        layout: PropTypes.string,
        validateOnSubmit: PropTypes.bool,
        validatePristine: PropTypes.bool,
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
            validateOnSubmit: this.props.validateOnSubmit || false,
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
