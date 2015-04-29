/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var Row = require('./row');
var FRCMixin = require('./mixin');

var Textarea = React.createClass({

    mixins: [Formsy.Mixin, FRCMixin],

    changeValue: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderInput: function() {
        return (
            <textarea
                className="form-control"
                name="{this.props.name}"
                rows="3"
                value={this.getValue()}
                onChange={this.changeValue}
                placeholder={this.props.placeholder}
                disabled={this.isFormDisabled() || this.props.disabled}
            ></textarea>
        );
    },

    render: function() {
        return (
            <Row
                label={this.props.label}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.props.layout}
                htmlFor={this.props.name}
            >
                {this.renderInput()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = Textarea;
