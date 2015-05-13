/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');

var Select = React.createClass({

    mixins: [Formsy.Mixin, FRCMixin],

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
    },

    render: function() {

        if (this.props.layout === 'elementOnly') {
            return this.renderElement();
        }

        return (
            <Row
                label={this.props.label}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.props.layout}
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
                <option key={item.value} value={item.value}>{item.label}</option>
            );
        });
        return (
            <select
                className="form-control"
                {...this.props}
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
