/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');

var CheckboxGroup = React.createClass({displayName: "CheckboxGroup",

    mixins: [Formsy.Mixin, FRCMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function() {
        return {
            label: '',
            help: null
        };
    },

    changeCheckbox: function() {
        var value = [];
        this.props.options.forEach(function(option, key) {
            if (this.refs[key].getDOMNode().checked) {
                value.push(option.value);
            }

        }.bind(this));
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function() {
        var _this = this;
        var controls = this.props.options.map(function(checkbox, key) {
            var checked = (_this.getValue().indexOf(checkbox.value) !== -1);
            var disabled = _this.isFormDisabled() || checkbox.disabled || _this.props.disabled;
            return (
                React.createElement("div", {className: "checkbox", key: key}, 
                    React.createElement("label", null, 
                        React.createElement("input", {
                            ref: key, 
                            checked: checked, 
                            type: "checkbox", 
                            value: checkbox.value, 
                            onChange: _this.changeCheckbox, 
                            disabled: disabled}
                        ), " ", checkbox.label
                    )
                )
            );
        });
        return controls;
    },

    render: function() {

        if (this.props.layout === 'elementOnly') {
            return (
                React.createElement("div", null, this.renderElement())
            );
        }

        return (
            React.createElement(Row, {
                label: this.props.label, 
                required: this.isRequired(), 
                hasErrors: this.showErrors(), 
                layout: this.props.layout, 
                fakeLabel: true
            }, 
                this.renderElement(), 
                this.renderHelp(), 
                this.renderErrorMessage()
            )
        );
    }
});

module.exports = CheckboxGroup;
