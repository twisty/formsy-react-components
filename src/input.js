/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var Icon = require('./icon');

var Input = React.createClass({
    displayName: 'Input',

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
        ])
    },

    getDefaultProps: function() {
        return {
            type: 'text'
        };
    },

    changeValue: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    render: function() {
        var element = this.renderElement();

        if (this.getLayout() === 'elementOnly' || this.props.type === 'hidden') {
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
                label={this.props.label}
                rowClassName={this.props.rowClassName}
                labelClassName={this.props.labelClassName}
                elementWrapperClassName={this.props.elementWrapperClassName}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.getLayout()}
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
    }

});

module.exports = Input;
