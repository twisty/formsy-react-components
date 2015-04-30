/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');

var Select = React.createClass({

    mixins: [Formsy.Mixin, FRCMixin],

    changeValue: function(event) {
        this.setValue(event.currentTarget.value);
    },

    render: function() {

        var formElement = '';

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
                name={this.props.name}
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
