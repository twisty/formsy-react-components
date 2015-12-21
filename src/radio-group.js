/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var classnames = require('classnames');
var Row = require('./row');

var RadioGroup = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.oneOf(['inline', 'stacked']),
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function() {
        return {
            type: 'stacked',
            label: '',
            help: null
        };
    },

    changeRadio: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function() {
        var _this = this;
        var controls = this.props.options.map(function(radio, key) {
            var checked = (_this.getValue() === radio.value);
            var disabled = _this.isFormDisabled() || radio.disabled || _this.props.disabled;
            var className = classnames({
                'radio':        _this.props.type !== 'inline',
                'radio-inline': _this.props.type === 'inline',
                'disabled':     disabled,
                'active':       checked
            });
            if (_this.props.type === 'inline') {
                return (
                    <label className={className} key={key}>
                        <input
                            name={_this.props.name}
                            checked={checked}
                            type="radio"
                            value={radio.value}
                            onChange={_this.changeRadio}
                            disabled={disabled}
                        /> {radio.label}
                    </label>
                );
            }
            return (
                <div className={className} key={key}>
                    <label>
                        <input
                            name={_this.props.name}
                            checked={checked}
                            type="radio"
                            value={radio.value}
                            onChange={_this.changeRadio}
                            disabled={disabled}
                        /> {radio.label}
                    </label>
                </div>
            );
        });
        return controls;
    },

    render: function() {

        if (this.getLayout() === 'elementOnly') {
            return (
                <div>{this.renderElement()}</div>
            );
        }

        return (
            <Row
                {...this.getRowProperties()}
                fakeLabel={true}
            >
                {this.renderElement()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = RadioGroup;
