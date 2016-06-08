/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Checkbox = React.createClass({

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
            <div className="checkbox">
                <label>
                    <input
                        ref="element"
                        {...this.props}
                        id={this.getId()}
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

        if (this.getLayout() === 'elementOnly') {
            return element;
        }

        return (
            <Row
                {...this.getRowProperties()}
                label={this.props.rowLabel}
                htmlFor={this.getId()}
            >
                {element}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = Checkbox;
