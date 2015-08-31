/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Select = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    changeValue: function(event) {
        var target = event.currentTarget;
        var value;
        if (this.props.multiple) {
            value = [];
            for (var i = 0; i < target.length; i++){
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

    render: function() {

        if (this.getLayout() === 'elementOnly') {
            return this.renderElement();
        }

        return (
            <Row
                label={this.props.label}
                labelClassName={this.props.labelClassName}
                wrapperClassName={this.props.wrapperClassName}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.getLayout()}
                htmlFor={this.getId()}
            >
                {this.renderElement()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    },

    renderElement: function() {
        var optionNodes = this.props.options.map(function(item) {
            return (
                <option disabled={item.disabled} key={item.value} value={item.value}>{item.label}</option>
            );
        });
        return (
            <select
                className="form-control"
                {...this.props}
                id={this.getId()}
                value={this.getValue()}
                onChange={this.changeValue}
                disabled={this.isFormDisabled() || this.props.disabled}
            >
                {optionNodes}
            </select>
        );
    }
});

module.exports = Select;
