/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var CheckboxGroup = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function() {
        return {
            label: '',
            help: null
        };
    },

    changeCheckbox: function() {
        var value = [];
        this.props.options.forEach(function(option, key) {
            if (this.refs[key].getDOMNode().checked) {
                value.push(option.value);
            }

        }.bind(this));
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function() {
        var _this = this;
        var controls = this.props.options.map(function(checkbox, key) {
            var checked = (_this.getValue().indexOf(checkbox.value) !== -1);
            var disabled = _this.isFormDisabled() || checkbox.disabled || _this.props.disabled;
            return (
                <div className="checkbox" key={key}>
                    <label>
                        <input
                            ref={key}
                            checked={checked}
                            type="checkbox"
                            value={checkbox.value}
                            onChange={_this.changeCheckbox}
                            disabled={disabled}
                        /> {checkbox.label}
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
                label={this.props.label}
                rowClassName={this.props.rowClassName}
                labelClassName={this.props.labelClassName}
                elementWrapperClassName={this.props.elementWrapperClassName}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.getLayout()}
                fakeLabel={true}
            >
                {this.renderElement()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = CheckboxGroup;
