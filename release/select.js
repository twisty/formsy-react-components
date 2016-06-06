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
            _extends({}, this.getRowProperties(), {
                htmlFor: this.getId()
            }),
            this.renderElement(),
            this.renderHelp(),
            this.renderErrorMessage()
        );
    },

    renderElement: function renderElement() {
		var options = this.props.options;
        var groups = [];

        this.props.options.map(function (item) {
            var exists = groups.some(function (it) {
                return it == item.group;
            });
            if (item.group && item.group != "" && !exists) {
                groups.push(item.group);
            }
        });

        var optionNodes = [];

        if (groups.length == 0) {
            optionNodes = options.map(function (item, index) {
                return React.createElement(
                    'option',
                    _extends({ key: index }, item, { label: null }),
                    item.label
                );
            });
        } else {
            groups.forEach(function (group, indexGroup) {
                var allItems = options.filter(function (c) {
                    return c.group == group;
                });

                var itemsJsx = [];

                allItems.forEach(function (item, index) {
                    itemsJsx.push(React.createElement(
                        'option',
                        _extends({ key: index }, item, { label: null }),
                        item.label
                    ));
                });

                optionNodes.push(React.createElement(
                    'optgroup',
                    { key: indexGroup, label: group },
                    itemsJsx
                ));
            });
        }
        return React.createElement(
            'select',
            _extends({
                ref: 'element',
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