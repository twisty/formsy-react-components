/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
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
        const controls = this.props.options.map((radio, key) => {
            let checked = (this.getValue() === radio.value);
            let disabled = this.isFormDisabled() || radio.disabled || this.props.disabled;
            let className = 'radio' + (disabled ? ' disabled' : '');
            if (this.props.type === 'inline') {
                return (
                    <label className="radio-inline" key={key}>
                        <input
                            ref={'element-' + key}
                            checked={checked}
                            type="radio"
                            value={radio.value}
                            onChange={this.changeRadio}
                            disabled={disabled}
                        /> {radio.label}
                    </label>
                );
            }
            return (
                <div className={className} key={key}>
                    <label>
                        <input
                            ref={'element-' + key}
                            checked={checked}
                            type="radio"
                            value={radio.value}
                            onChange={this.changeRadio}
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
