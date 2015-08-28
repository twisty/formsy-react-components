/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Select = React.createClass({
    displayName: 'Select',

    mixins: [Formsy.Mixin, ComponentMixin],

    changeValue: function changeValue(event) {
        var target = event.currentTarget;
        var value;
        if (this.props.multiple) {
            value = [];
            for (var i = 0; i < target.length; i++) {
                var option = target.options[i];
                if (option.selected) {
                    value.push(option.value);
                }
            }
        } else {
            value = target.value;
        }
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    render: function render() {

        if (this.getLayout() === 'elementOnly') {
            return this.renderElement();
        }

        return React.createElement(
            Row,
            {
                label: this.props.label,
                required: this.isRequired(),
                hasErrors: this.showErrors(),
                layout: this.getLayout(),
                htmlFor: this.getId()
            },
            this.renderElement(),
            this.renderHelp(),
            this.renderErrorMessage()
        );
    },

    renderElement: function renderElement() {
        var optionNodes = this.props.options.map(function (item) {
            return React.createElement(
                'option',
                { disabled: item.disabled, key: item.value, value: item.value },
                item.label
            );
        });
        return React.createElement(
            'select',
            _extends({
                className: 'form-control'
            }, this.props, {
                id: this.getId(),
                value: this.getValue(),
                onChange: this.changeValue,
                disabled: this.isFormDisabled() || this.props.disabled
            }),
            optionNodes
        );
    }
});

module.exports = Select;