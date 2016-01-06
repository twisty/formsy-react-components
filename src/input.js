/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var Icon = require('./icon');

var Input = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        type: React.PropTypes.oneOf([
            'color',
            'date',
            'datetime',
            'datetime-local',
            'email',
            'hidden',
            'month',
            'number',
            'password',
            'range',
            'search',
            'tel',
            'text',
            'time',
            'url',
            'week'
        ]),
        addonBefore: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.node
        ]),
        addonAfter: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.node
        ])
    },

    getDefaultProps: function() {
        return {
            type: 'text',
            addonBefore: null,
            addonAfter: null
        };
    },

    changeValue: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    render: function() {
        var element = this.renderElement();

        if (this.props.type === 'hidden') {
            return element;
        }

        if (this.props.addonBefore || this.props.addonAfter) {
            element = this.renderInputGroup(element);
        }

        if (this.getLayout() === 'elementOnly') {
            return element;
        }

        var warningIcon = '';
        if (this.showErrors()) {
            warningIcon = (
                <Icon symbol="remove" className="form-control-feedback" />
            );
        }

        return (
            <Row
                {...this.getRowProperties()}
                htmlFor={this.getId()}
            >
                {element}
                {warningIcon}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    },

    renderElement: function() {
        var className = 'form-control';
        if (['range'].indexOf(this.props.type) !== -1) {
            className = null;
        }
        return (
            <input
                className={className}
                {...this.props}
                id={this.getId()}
                label={null}
                value={this.getValue()}
                onChange={this.changeValue}
                disabled={this.isFormDisabled() || this.props.disabled}
            />
        );
    },

    renderInputGroup: function(element) {
        return (
            <div className="input-group">
                {this.renderAddon(this.props.addonBefore)}
                {element}
                {this.renderAddon(this.props.addonAfter)}
            </div>
        );
    },

    renderAddon: function(addon) {
        if (!addon) {
            return false;
        }
        return (
            <span className="input-group-addon">{addon}</span>
        );
    }

});

module.exports = Input;
