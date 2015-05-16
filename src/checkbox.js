/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');

var Checkbox = React.createClass({

    mixins: [Formsy.Mixin, FRCMixin],

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
            <div className="checkbox">
                <label>
                    <input
                        {...this.props}
                        type="checkbox"
                        checked={this.getValue() === true}
                        onChange={this.changeValue}
                        disabled={this.isFormDisabled() || this.props.disabled}
                    /> {this.props.label}
                </label>
            </div>
        );
    },

    render: function() {

        var element = this.renderElement();

        if (this.props.layout === 'elementOnly') {
            return element;
        }

        return (
            <Row
                label={this.props.rowLabel}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.props.layout}
            >
                {element}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = Checkbox;
