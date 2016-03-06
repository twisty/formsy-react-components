/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Input = React.createClass({
    displayName: 'Input',


    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        type: React.PropTypes.oneOf(['color', 'date', 'datetime', 'datetime-local', 'email', 'hidden', 'month', 'number', 'password', 'range', 'search', 'tel', 'text', 'time', 'url', 'week']),
        addonBefore: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
        addonAfter: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
        buttonBefore: React.PropTypes.node,
        buttonAfter: React.PropTypes.node
    },

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'text',
            addonBefore: null,
            addonAfter: null,
            buttonBefore: null,
            buttonAfter: null
        };
    },

    changeValue: function changeValue(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    changeValueOnBlur: function changeValueOnBlur(event) {
        this.props.onBlur(this.props.name, this.getValue());
    },

    render: function render() {
        var element = this.renderElement();

        if (this.props.type === 'hidden') {
            return element;
        }

        if (this.props.addonBefore || this.props.addonAfter || this.props.buttonBefore || this.props.buttonAfter) {
            element = this.renderInputGroup(element);
        }

        if (this.getLayout() === 'elementOnly') {
            return element;
        }

        return React.createElement(
            Row,
            _extends({}, this.getRowProperties(), {
                htmlFor: this.getId()
            }),
            element,
            this.renderHelp(),
            this.renderErrorMessage()
        );
    },

    renderElement: function renderElement() {
        var className = 'form-control';
        if (this.showErrors()) {
            className = 'form-control-danger form-control';
        }

        if (['range'].indexOf(this.props.type) !== -1) {
            className = null;
        }
        return React.createElement('input', _extends({
            className: className
        }, this.props, {
            id: this.getId(),
            label: null,
            value: this.getValue(),
            onChange: this.changeValue,
            onBlur: this.changeValueOnBlur,
            disabled: this.isFormDisabled() || this.props.disabled
        }));
    },

    renderInputGroup: function renderInputGroup(element) {
        return React.createElement(
            'div',
            { className: 'input-group' },
            this.renderAddon(this.props.addonBefore),
            this.renderButton(this.props.buttonBefore),
            element,
            this.renderAddon(this.props.addonAfter),
            this.renderButton(this.props.buttonAfter)
        );
    },

    renderAddon: function renderAddon(addon) {
        if (!addon) {
            return false;
        }
        return React.createElement(
            'span',
            { className: 'input-group-addon' },
            addon
        );
    },

    renderButton: function renderButton(button) {
        if (!button) {
            return false;
        }
        return React.createElement(
            'span',
            { className: 'input-group-btn' },
            button
        );
    }

});

module.exports = Input;