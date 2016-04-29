import React, { PropTypes } from 'react';
import classNames from 'classnames/dedupe';

const RequiredSymbol = (props) => {
    if (props.required === false) {
        return null;
    }
    return (
        <span className="required-symbol"> *</span>
    );
}
RequiredSymbol.propTypes = {
    required: PropTypes.bool.isRequired
};

const Label = (props) => {

    const { layout, label, htmlFor, labelClassName, fakeLabel, required } = props;

    if (layout === 'elementOnly') {
        return null;
    }

    let labelClassNames = classNames([
        'control-label',
        (layout === 'horizontal') ? 'col-sm-3' : '',
        labelClassName
    ]);

    // TODO: Check for label content here and required symbol
    // If no content return null.

    if (fakeLabel) {
        return (
            <div
                className={labelClassNames}
                data-required={required}
            >
                <strong>
                    {label}
                    <RequiredSymbol required={required} />
                </strong>
            </div>
        );
    }

    return (
        <label
            className={labelClassNames}
            data-required={required}
            htmlFor={htmlFor}
        >
            {label}
            <RequiredSymbol required={required} />
        </label>
    );
}

Label.propTypes = {
    fakeLabel: PropTypes.bool,
    htmlFor: PropTypes.string,
    label: PropTypes.node,
    labelClassName: React.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
    required: PropTypes.bool
};

export default Label;
