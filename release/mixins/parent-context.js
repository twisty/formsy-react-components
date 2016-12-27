'use strict';

var React = require('react');

module.exports = {

    childContextTypes: {
        validateOnSubmit: React.PropTypes.bool.isRequired,
        layout: React.PropTypes.string.isRequired,
        validatePristine: React.PropTypes.bool.isRequired,
        rowClassName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object]),
        labelClassName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object]),
        elementWrapperClassName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object])
    },

    getChildContext: function getChildContext() {
        return {
            validateOnSubmit: this.props.validateOnSubmit || false,
            layout: this.props.layout || 'horizontal',
            validatePristine: this.props.validatePristine || false,
            rowClassName: this.props.rowClassName || '',
            labelClassName: this.props.labelClassName || '',
            elementWrapperClassName: this.props.elementWrapperClassName || ''
        };
    },

    getLayoutClassName: function getLayoutClassName() {
        return 'form-' + this.getChildContext().layout;
    }

};