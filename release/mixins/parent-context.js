'use strict';

var React = require('react');

module.exports = {

    childContextTypes: {
         layout: React.PropTypes.string.isRequired,
         validatePristine: React.PropTypes.bool.isRequired
    },

    getChildContext: function() {
        return {
            layout: this.props.layout || 'horizontal',
            validatePristine: this.props.validatePristine || true
        };
    },

    getLayoutClassName: function() {
        return 'form-' + this.getChildContext().layout;
    }

};
