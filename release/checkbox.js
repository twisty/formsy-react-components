/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Checkbox = React.createClass({displayName: "Checkbox",

    mixins: [Formsy.Mixin, ComponentMixin],

    getDefaultProps: function() {
        return {
            label: '',
            rowLabel: '',
            value: false
        };
    },

    changeValue: function(event) {
        var target = event.currentTarget;
        this.setValue(target.checked);
        this.props.onChange(this.props.name, target.checked);
    },

    renderElement: function() {
        return (
            React.createElement("div", {className: "checkbox"}, 
                React.createElement("label", null, 
                    React.createElement("input", React.__spread({}, 
                        this.props, 
                        {type: "checkbox", 
                        checked: this.getValue() === true, 
                        onChange: this.changeValue, 
                        disabled: this.isFormDisabled() || this.props.disabled})
                    ), " ", this.props.label
                )
            )
        );
    },

    render: function() {

        var element = this.renderElement();

        if (this.getLayout() === 'elementOnly') {
            return element;
        }

        return (
            React.createElement(Row, {
                label: this.props.rowLabel, 
                required: this.isRequired(), 
                hasErrors: this.showErrors(), 
                layout: this.getLayout()
            }, 
                element, 
                this.renderHelp(), 
                this.renderErrorMessage()
            )
        );
    }
});

module.exports = Checkbox;
