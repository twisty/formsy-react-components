/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');

var Checkbox = React.createClass({

    mixins: [Formsy.Mixin],

    getDefaultProps: function() {
        return {
            label: '',
            value: false,
            onChange: function() {},
            disabled: false
        };
    },

    changeValue: function(event) {
        var target = event.currentTarget;
        this.setValue(target.checked);
        this.props.onChange(this.props.name, target.checked);
    },

    render: function() {
        return (
            <div className="checkbox">
                <label>
                    <input
                        checked={this.getValue() === true}
                        type="checkbox"
                        value={this.props.value}
                        onChange={this.changeValue}
                        disabled={this.isFormDisabled() || this.props.disabled}
                    /> {this.props.label}
                </label>
            </div>
        );
    }
});

module.exports = Checkbox;
