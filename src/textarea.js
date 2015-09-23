/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Textarea = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        rows: React.PropTypes.number,
        cols: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            rows: 3,
            cols: 0 // React doesn't render the cols attribute if it is zero
        };
    },

    changeValue: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function() {
        return (
            <textarea
                className="form-control"
                {...this.props}
                id={this.getId()}
                value={this.getValue()}
                onChange={this.changeValue}
                disabled={this.isFormDisabled() || this.props.disabled}
            ></textarea>
        );
    },

    render: function() {

        if (this.getLayout() === 'elementOnly') {
            return this.renderElement();
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
                {this.renderElement()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = Textarea;
