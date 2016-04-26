import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/dedupe';

class Row extends Component
{
    renderRequiredSymbol() {
        if (this.props.required === false) {
            return null;
        }
        return (
            <span className="required-symbol"> *</span>
        );
    }

    renderLabel() {

        const { layout, label, htmlFor, labelClassName, fakeLabel, required } = this.props;

        if (layout === 'elementOnly') {
            return null;
        }

        var labelClassNames = [];
        labelClassNames.push('control-label');

        if (layout === 'horizontal') {
            labelClassNames.push('col-sm-3');
        }

        labelClassNames.push(labelClassName);

        if (fakeLabel) {
            return (
                <div
                    className={classNames(labelClassNames)}
                    data-required={required}
                >
                    <strong>
                        {label}
                        {this.renderRequiredSymbol()}
                    </strong>
                </div>
            );
        }

        return (
            <label
                className={classNames(labelClassNames)}
                data-required={required}
                htmlFor={htmlFor}
            >
                {label}
                {this.renderRequiredSymbol()}
            </label>
        );
    }

    render() {

        const { elementWrapperClassName, rowClassName, showErrors, layout } = this.props;

        let element = this.props.children;

        if (layout === 'elementOnly') {
            return (
                <span>
                {element}
                </span>
            );
        }

        var cssClasses = {
            row: ['form-group'],
            elementWrapper: []
        };

        if (showErrors) {
            cssClasses.row.push('has-error');
            cssClasses.row.push('has-feedback');
        }

        if (layout === 'horizontal') {

            // Horizontal layout needs a 'row' class for Bootstrap 4
            cssClasses.row.push('row');

            cssClasses.elementWrapper.push('col-sm-9');
            cssClasses.elementWrapper.push(elementWrapperClassName);

            element = (
                <div className={classNames(cssClasses.elementWrapper)}>
                    {element}
                </div>
            );
        }

        cssClasses.row.push(rowClassName);
        return (
            <div className={classNames(cssClasses.row)}>
                {this.renderLabel()}
                {element}
            </div>
        );
    }

}

Row.propTypes = {
    children: PropTypes.node,
    elementWrapperClassName: React.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
    fakeLabel: PropTypes.bool,
    htmlFor: PropTypes.string,
    label: PropTypes.node,
    labelClassName: React.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
    required: PropTypes.bool,
    rowClassName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
    showErrors: PropTypes.bool
};

Row.defaultProps = {
    label: '',
    rowClassName: '',
    labelClassName: '',
    elementWrapperClassName: '',
    required: false,
    showErrors: false,
    fakeLabel: false
};

export default Row;
