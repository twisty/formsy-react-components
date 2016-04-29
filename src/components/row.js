import React, { PropTypes } from 'react';
import classNames from 'classnames/dedupe';
import Label from './label';

const Row = (props) => {

    const { elementWrapperClassName, rowClassName, showErrors, layout } = props;

    let element = props.children;

    if (layout === 'elementOnly') {
        return (
            <span>
                {element}
            </span>
        );
    }

    let cssClasses = {
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
            <Label {...props} />
            {element}
        </div>
    );
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
