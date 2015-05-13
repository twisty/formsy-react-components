'use strict';

var React = require('react');

module.exports = {
    getDefaultProps: function() {
        return {
            disabled: false,
            validatePristine: false,
            layout: 'horizontal',
            onChange: function() {},
            onFocus: function() {},
            onBlur: function() {}
        };
    },

    renderHelp: function() {
        if (!this.props.help) {
            return '';
        }
        return (
            React.createElement("span", {className: "help-block"}, this.props.help)
        );
    },

    renderErrorMessage: function() {
        if (!this.showErrors()) {
            return '';
        }
        var errorMessage = this.getErrorMessage();
        if (!errorMessage) {
            return '';
        }
        return (
            React.createElement("span", {className: "help-block validation-message"}, errorMessage)
        );
    },

    showErrors: function() {
        if (this.isPristine() === true) {
            if (this.props.validatePristine === false) {
                return false;
            }
        }
        return (this.isValid() === false);
    }
};
