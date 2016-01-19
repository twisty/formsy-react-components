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

    propTypes: {
        addonBefore: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
        addonAfter: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
        buttonBefore: React.PropTypes.node,
        buttonAfter: React.PropTypes.node
    },

    getDefaultProps: function getDefaultProps() {
        return {
            addonBefore: null,
            addonAfter: null,
            buttonBefore: null,
            buttonAfter: null
        };
    },

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
        var element = this.renderElement();
        if (this.getLayout() === 'elementOnly') {
            return element;
        }
        if (this.props.addonBefore || this.props.addonAfter || this.props.buttonBefore || this.props.buttonAfter) {
            element = this.renderInputGroup(element);
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
        var optionNodes = this.props.options.map(function (item, index) {
            return React.createElement(
                'option',
                _extends({ key: index }, item, { label: null }),
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

module.exports = Select;