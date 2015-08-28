'use strict';

var React = require('react');

module.exports = {

    propTypes: {
        layout: React.PropTypes.string
    },

    contextTypes: {
        layout: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            validatePristine: false,
            onChange: function onChange() {},
            onFocus: function onFocus() {},
            onBlur: function onBlur() {}
        };
    },

    hashString: function hashString(string) {
        var hash = 0;
        for (var i = 0; i < string.length; i++) {
            hash = (hash << 5) - hash + string.charCodeAt(i) & 0xFFFFFFFF;
        }
        return hash;
    },

    getId: function getId() {
        return this.props.id || this.props.name.split('[').join('_').replace(']', '') + this.hashString(JSON.stringify(this.props));
    },

    getLayout: function getLayout() {
        var defaultLayout = this.context.layout || 'horizontal';
        return this.props.layout ? this.props.layout : defaultLayout;
    },

    renderHelp: function renderHelp() {
        if (!this.props.help) {
            return '';
        }
        return React.createElement(
            'span',
            { className: 'help-block' },
            this.props.help
        );
    },

    renderErrorMessage: function renderErrorMessage() {
        if (!this.showErrors()) {
            return '';
        }
        var errorMessages = this.getErrorMessages() || [];
        return errorMessages.map(function (message, key) {
            return React.createElement(
                'span',
                { key: key, className: 'help-block validation-message' },
                message
            );
        });
    },

    showErrors: function showErrors() {
        if (this.isPristine() === true) {
            if (this.props.validatePristine === false) {
                return false;
            }
        }
        return this.isValid() === false;
    }
};