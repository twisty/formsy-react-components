/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');
var Icon = require('./icon.js');

var Input = React.createClass({

    mixins: [Formsy.Mixin, FRCMixin],

    propTypes: {
        type: React.PropTypes.oneOf(['text', 'select', 'hidden'])
    },

    changeValue: function(event) {
        this.setValue(event.currentTarget.value);
    },

    getDefaultProps: function() {
        return {
            type: 'text'
        };
    },

    render: function() {

        var formElement = '';
        var warningIcon = '';

        if (this.showErrors()) {
            warningIcon = (
                <Icon symbol="remove" className="form-control-feedback" />
            );
        }

        switch (this.props.type) {
            case 'text':
            case 'hidden':
                formElement = this.renderText();
                break;
            case 'select':
                formElement = this.renderSelect();
                warningIcon = ''; // only supported on text types
                break;
        }

        return (
            <Row
                label={this.props.label}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.props.layout}
            >
                {formElement}
                {warningIcon}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    },

    renderText: function() {
        return (
            <input
                className="form-control"
                type={this.props.type}
                name={this.props.name}
                value={this.getValue()}
                placeholder={this.props.placeholder}
                onChange={this.changeValue}
                disabled={this.isFormDisabled()}
            />
        );
    },

    renderSelect: function() {
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
                disabled={this.isFormDisabled()}
            >
                {optionNodes}
            </select>
        );
    }
});

module.exports = Input;
