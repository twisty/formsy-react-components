/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var RadioGroup = React.createClass({
    displayName: 'RadioGroup',


    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.oneOf(['inline', 'stacked']),
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'stacked',
            label: '',
            help: null
        };
    },

    changeRadio: function changeRadio(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function renderElement() {
        var _this = this;

        var controls = this.props.options.map(function (radio, key) {
            var checked = _this.getValue() === radio.value;
            var disabled = _this.isFormDisabled() || radio.disabled || _this.props.disabled;
            var className = 'radio' + (disabled ? ' disabled' : '');
            if (_this.props.type === 'inline') {
                return React.createElement(
                    'label',
                    { className: 'radio-inline', key: key },
                    React.createElement('input', {
                        ref: function ref(c) {
                            return _this['element-' + key] = c;
                        },
                        checked: checked,
                        type: 'radio',
                        value: radio.value,
                        onChange: _this.changeRadio,
                        disabled: disabled
                    }),
                    ' ',
                    radio.label
                );
            }
            return React.createElement(
                'div',
                { className: className, key: key },
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', {
                        ref: function ref(c) {
                            return _this['element-' + key] = c;
                        },
                        checked: checked,
                        type: 'radio',
                        value: radio.value,
                        onChange: _this.changeRadio,
                        disabled: disabled
                    }),
                    ' ',
                    radio.label
                )
            );
        });
        return controls;
    },

    render: function render() {

        if (this.getLayout() === 'elementOnly') {
            return React.createElement(
                'div',
                null,
                this.renderElement()
            );
        }

        return React.createElement(
            Row,
            _extends({}, this.getRowProperties(), {
                fakeLabel: true
            }),
            this.renderElement(),
            this.renderHelp(),
            this.renderErrorMessage()
        );
    }
});

module.exports = RadioGroup;