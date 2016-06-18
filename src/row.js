/*jshint node:true */

'use strict';

var React = require('react');
var classNames = require('classnames/dedupe');

var Row = React.createClass({

    propTypes: {
        label: React.PropTypes.node,
        children: React.PropTypes.node,
        rowClassName: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        labelClassName: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        elementWrapperClassName: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        required: React.PropTypes.bool,
        hasErrors: React.PropTypes.bool,
        fakeLabel: React.PropTypes.bool,
        layout: React.PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
        htmlFor: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            label: '',
            rowClassName: '',
            labelClassName: '',
            elementWrapperClassName: '',
            required: false,
            hasErrors: false,
            fakeLabel: false
        };
    },

    renderRequiredSymbol: function() {
        if (this.props.required === false) {
            return null;
        }
        return (
            <span className="required-symbol"> *</span>
        );
    },

    renderLabel: function() {

        if (this.props.layout === 'elementOnly') {
            return null;
        }

        var labelClassNames = [];
        labelClassNames.push('control-label');

        if (this.props.layout === 'horizontal') {
            labelClassNames.push('col-sm-3');
        }

        labelClassNames.push(this.props.labelClassName);

        if (this.props.fakeLabel) {
            return (
                <div
                    className={classNames(labelClassNames)}
                    data-required={this.props.required}
                >
                    <strong>
                        {this.props.label}
                        {this.renderRequiredSymbol()}
                    </strong>
                </div>
            );
        }

        return (
            <label
                className={classNames(labelClassNames)}
                data-required={this.props.required}
                htmlFor={this.props.htmlFor}
            >
                {this.props.label}
                {this.renderRequiredSymbol()}
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

        var cssClasses = {
            row: ['form-group'],
            elementWrapper: []
        };

        if (this.props.hasErrors) {
            cssClasses.row.push('has-error');
            cssClasses.row.push('has-feedback');
        }

        var element = this.props.children;
        if (this.props.layout === 'horizontal') {

            // Horizontal layout needs a 'row' class for Bootstrap 4
            cssClasses.row.push('row');

            cssClasses.elementWrapper.push('col-sm-9');
            cssClasses.elementWrapper.push(this.props.elementWrapperClassName);

            element = (
                <div className={classNames(cssClasses.elementWrapper)}>
                    {this.props.children}
                </div>
            );
        }

        cssClasses.row.push(this.props.rowClassName);
        return (
            <div className={classNames(cssClasses.row)}>
                {this.renderLabel()}
                {element}
            </div>
        );
    }

});

module.exports = Row;
