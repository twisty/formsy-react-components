/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');

var Select = React.createClass({displayName: "Select",

    mixins: [Formsy.Mixin, FRCMixin],

    changeValue: function(event) {
        this.setValue(event.currentTarget.value);
    },

    render: function() {

        if (this.props.layout === 'elementOnly') {
            return this.renderElement();
        }

        return (
            React.createElement(Row, {
                label: this.props.label, 
                required: this.isRequired(), 
                hasErrors: this.showErrors(), 
                layout: this.props.layout
            }, 
                this.renderElement(), 
                this.renderHelp(), 
                this.renderErrorMessage()
            )
        );
    },

    renderElement: function() {
        var optionNodes = this.props.options.map(function(item) {
            return (
                React.createElement("option", {key: item.value, value: item.value}, item.label)
            );
        });
        return (
            React.createElement("select", React.__spread({
                className: "form-control"}, 
                this.props, 
                {value: this.getValue(), 
                onChange: this.changeValue, 
                disabled: this.isFormDisabled() || this.props.disabled
            }), 
                optionNodes
            )
        );
    }
});

module.exports = Select;
