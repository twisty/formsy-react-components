import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import styleClassNames from './prop-types';
import Label from './label';

const Row = (props) => {

    const { elementWrapperClassName, required, rowClassName, showErrors, layout, label } = props;

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

    // We should render the label if there is label text defined, or if the
    // component is required (so a required symbol is displayed in the label tag)
    const shouldRenderLabel = ((label !== null) || required);

    if (layout === 'horizontal') {

        // Horizontal layout needs a 'row' class for Bootstrap 4
        cssClasses.row.push('row');

        if (!shouldRenderLabel) {
            cssClasses.elementWrapper.push('col-sm-offset-3');
        }

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
            {(shouldRenderLabel) ? <Label {...props} /> : null}
            {element}
        </div>
    );
}

Row.propTypes = {
    ...styleClassNames,
    children: PropTypes.node,
    fakeLabel: PropTypes.bool,
    htmlFor: PropTypes.string,
    label: PropTypes.node,
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
    required: PropTypes.bool,
    showErrors: PropTypes.bool
};

Row.defaultProps = {
    label: null,
    rowClassName: '',
    labelClassName: '',
    elementWrapperClassName: '',
    required: false,
    showErrors: false,
    fakeLabel: false
};

export default Row;
