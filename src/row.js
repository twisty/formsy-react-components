/*jshint node:true */

'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');
var classNames = require('classnames/dedupe');

var Row = createReactClass({

    propTypes: {
        label: PropTypes.node,
        children: PropTypes.node,
        rowClassName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object
        ]),
        labelClassName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object
        ]),
        elementWrapperClassName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object
        ]),
        required: PropTypes.bool,
        hasErrors: PropTypes.bool,
        fakeLabel: PropTypes.bool,
        layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
        htmlFor: PropTypes.string
    },

    getDefaultProps: function() {
        return {
            label: false,
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
        labelClassNames.push('form-control-label');

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
        } else if (this.props.label) {
            return (
                <label className={classNames(labelClassNames)} htmlFor={this.props.htmlFor}>
                    {this.props.label}
                    {this.props.required ? ' *' : null}
                </label>
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
            cssClasses.row.push('has-danger');
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
