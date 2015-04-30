/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var Icon = require('../../icon.js');

var Input = React.createClass({

    mixins: [Formsy.Mixin],

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
        var formGroupClassNames = 'form-group';
        var errorMessage = this.getErrorMessage();
        var errorMessageNode = '';

        if (this.isValid() === false) {
            formGroupClassNames += ' has-error has-feedback';
            warningIcon = (
                <Icon symbol="remove" className="form-control-feedback" />
            );
        }

        if (errorMessage) {
            errorMessageNode = (
                <span className="help-block">
                    {errorMessage}
                </span>
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
            <div className={formGroupClassNames}>
                <label htmlFor={this.props.name} className="col-sm-3 control-label">
                    {this.props.label}
                    {this.isRequired() ? ' *' : null}
                </label>
                <div className="col-sm-9">
                    {formElement}
                    {warningIcon}
                    {errorMessageNode}
                </div>
            </div>
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
