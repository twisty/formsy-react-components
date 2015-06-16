'use strict';

var React = require('react');

module.exports = {

    propTypes: {
        layout: React.PropTypes.string
    },

    contextTypes: {
        layout: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            disabled: false,
            validatePristine: false,
            onChange: function() {},
            onFocus: function() {},
            onBlur: function() {}
        };
    },

    hashString: function(string) {
        var hash = 0;
        for (var i = 0; i < string.length; i++) {
            hash = (((hash << 5) - hash) + string.charCodeAt(i)) & 0xFFFFFFFF;
        }
        return hash;
    },

    getId: function() {
        return this.props.id || this.props.name.split('[').join('_').replace(']', '') + this.hashString(JSON.stringify(this.props));
    },

    getLayout: function() {
        var defaultLayout = this.context.layout || 'horizontal';
        return this.props.layout ? this.props.layout : defaultLayout;
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
