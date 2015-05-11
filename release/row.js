/*jshint node:true */

'use strict';

var React = require('react');

var Row = React.createClass({displayName: "Row",

    propTypes: {
        label: React.PropTypes.string,
        required: React.PropTypes.bool,
        hasErrors: React.PropTypes.bool,
        fakeLabel: React.PropTypes.bool,
        layout: React.PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
        htmlFor: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            label: '',
            required: false,
            hasErrors: false,
            fakeLabel: false
        };
    },

    renderLabel: function() {

        if (this.props.layout === 'elementOnly') {
            return '';
        }

        var labelWrapper = [];
        labelWrapper.push('control-label');

        if (this.props.layout === 'horizontal') {
            labelWrapper.push('col-sm-3');
        }

        if (this.props.fakeLabel) {
            return (
                React.createElement("div", {className: labelWrapper.join(' ')}, 
                    React.createElement("strong", null, 
                        this.props.label, 
                        this.props.required ? ' *' : null
                    )
                )
            );
        }
        return (
            React.createElement("label", {className: labelWrapper.join(' '), htmlFor: this.props.htmlFor}, 
                this.props.label, 
                this.props.required ? ' *' : null
            )
        );
    },

    render: function() {

        if (this.props.layout === 'elementOnly') {
            return (
                React.createElement("span", null, 
                this.props.children
                )
            );
        }

        var classNames = {
            formGroup: ['form-group'],
            elementWrapper: []
        };

        if (this.props.layout === 'horizontal') {
            classNames.elementWrapper.push('col-sm-9');
        }

        if (this.props.hasErrors) {
            classNames.formGroup.push('has-error');
            classNames.formGroup.push('has-warning');
            classNames.formGroup.push('has-feedback');
        }

        var element = this.props.children;
        if (this.props.layout === 'horizontal') {
            element = (
                React.createElement("div", {className: classNames.elementWrapper.join(' ')}, 
                    this.props.children
                )
            );
        }

        return (
            React.createElement("div", {className: classNames.formGroup.join(' ')}, 
                this.renderLabel(), 
                element
            )
        );
    }

});

module.exports = Row;
