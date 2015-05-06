/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var Row = require('./row');
var FRCMixin = require('./mixin');

var Textarea = React.createClass({

    mixins: [Formsy.Mixin, FRCMixin],

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
                name={this.props.name}
                rows={this.props.rows}
                cols={this.props.cols}
                value={this.getValue()}
                onChange={this.changeValue}
                placeholder={this.props.placeholder}
                disabled={this.isFormDisabled() || this.props.disabled}
            ></textarea>
        );
    },

    render: function() {

        if (this.props.layout === 'elementOnly') {
            return this.renderElement();
        }

        return (
            <Row
                label={this.props.label}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.props.layout}
                htmlFor={this.props.name}
            >
                {this.renderElement()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = Textarea;
