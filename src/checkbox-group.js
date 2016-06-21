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
            if (this.refs['element-' + key].checked) {
                value.push(option.value);
            }

        }.bind(this));
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function() {
        const controls = this.props.options.map((checkbox, key) => {
            let checked = (this.getValue().indexOf(checkbox.value) !== -1);
            let disabled = this.isFormDisabled() || checkbox.disabled || this.props.disabled;
            return (
                <div className="checkbox" key={key}>
                    <label>
                        <input
                            ref={'element-' + key}
                            checked={checked}
                            type="checkbox"
                            value={checkbox.value}
                            onChange={this.changeCheckbox}
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

module.exports = CheckboxGroup;
