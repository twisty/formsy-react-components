/*jshint node:true */

'use strict';

var React = require('react');

var Row = React.createClass({
    displayName: 'Row',

    propTypes: {
        label: React.PropTypes.string,
        labelClassName: React.PropTypes.string,
        wrapperClassName: React.PropTypes.string,
        required: React.PropTypes.bool,
        hasErrors: React.PropTypes.bool,
        fakeLabel: React.PropTypes.bool,
        layout: React.PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
        htmlFor: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            label: '',
            labelClassName: '',
            wrapperClassName: '',
            required: false,
            hasErrors: false,
            fakeLabel: false
        };
    },

    renderLabel: function renderLabel() {

        if (this.props.layout === 'elementOnly') {
            return '';
        }

        var labelWrapper = [];
        labelWrapper.push('control-label');

        if (this.props.layout === 'horizontal') {
            labelWrapper.push(this.props.labelClassName || 'col-sm-3');
        }

        if (this.props.fakeLabel) {
            return React.createElement(
                'div',
                { className: labelWrapper.join(' ') },
                React.createElement(
                    'strong',
                    null,
                    this.props.label,
                    this.props.required ? ' *' : null
                )
            );
        }
        return React.createElement(
            'label',
            { className: labelWrapper.join(' '), htmlFor: this.props.htmlFor },
            this.props.label,
            this.props.required ? ' *' : null
        );
    },

    render: function render() {

        if (this.props.layout === 'elementOnly') {
            return React.createElement(
                'span',
                null,
                this.props.children
            );
        }

        var classNames = {
            formGroup: ['form-group'],
            elementWrapper: []
        };

        if (this.props.layout === 'horizontal') {
            classNames.formGroup.push('row');
            classNames.elementWrapper.push(this.props.wrapperClassName || 'col-sm-9');
        }

        if (this.props.hasErrors) {
            classNames.formGroup.push('has-error');
            classNames.formGroup.push('has-feedback');
        }

        var element = this.props.children;
        if (this.props.layout === 'horizontal') {
            element = React.createElement(
                'div',
                { className: classNames.elementWrapper.join(' ') },
                this.props.children
            );
        }

        return React.createElement(
            'div',
            { className: classNames.formGroup.join(' ') },
            this.renderLabel(),
            element
        );
    }

});

module.exports = Row;