/*jshint node:true */

'use strict';

var React = require('react');

var Row = React.createClass({

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
                <div className={labelWrapper.join(' ')}>
                    <strong>
                        {this.props.label}
                        {this.props.required ? ' *' : null}
                    </strong>
                </div>
            );
        }
        return (
            <label className={labelWrapper.join(' ')} htmlFor={this.props.htmlFor}>
                {this.props.label}
                {this.props.required ? ' *' : null}
            </label>
        );
    },

    render: function() {

        if (this.props.layout === 'elementOnly') {
            return (
                <span>
                {this.props.children}
                </span>
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
                <div className={classNames.elementWrapper.join(' ')}>
                    {this.props.children}
                </div>
            );
        }

        return (
            <div className={classNames.formGroup.join(' ')}>
                {this.renderLabel()}
                {element}
            </div>
        );
    }

});

module.exports = Row;
