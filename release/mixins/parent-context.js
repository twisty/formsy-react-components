'use strict';

var React = require('react');

module.exports = {

    childContextTypes: {
        layout: React.PropTypes.string.isRequired,
        validatePristine: React.PropTypes.bool.isRequired
    },

    getChildContext: function getChildContext() {
        return {
            layout: this.props.layout || 'horizontal',
            validatePristine: this.props.validatePristine || true
        };
    },

    getLayoutClassName: function getLayoutClassName() {
        return 'form-' + this.getChildContext().layout;
    }

};