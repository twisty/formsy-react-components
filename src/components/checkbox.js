import React, { Component, PropTypes } from 'react';
import { controlProps, commonProps, commonDefaults } from './prop-types';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

class Checkbox extends Component {

    handleChange = (event) => {
        const value = event.currentTarget.checked;
        this.props.onSetValue(value);
        this.props.onChange(this.props.name, value);
    }

    renderElement = () => {
        let inputProps = Object.assign({}, this.props);
        Object.keys(commonProps).forEach((key) => {
            delete inputProps[key];
        });
        delete inputProps.valueLabel;
        return (
            <div className="checkbox">
                <label>
                    <input
                        {...inputProps}
                        type="checkbox"
                        label={undefined}
                        checked={this.props.value === true}
                        onChange={this.handleChange}
                    /> {this.props.valueLabel}
                </label>
            </div>
        );
    }

    render() {

        let element = this.renderElement();

        if (this.props.layout === 'elementOnly') {
            return element;
        }

        return (
            <Row
                {...this.props}
                fakeLabel={true}
                htmlFor={this.props.id}
            >
                {element}
                {this.props.help ? <Help help={this.props.help} /> : null}
                {this.props.showErrors ? <ErrorMessages messages={this.props.errorMessages} /> : null}
            </Row>
        );
    }
}

/*
 * TODO Document this API change.
 *
 * The expected props for this component have been changed for consistency with
 * the other components.
 *
 * Should warn and depricate this on the master branch.
 *
 * if rowLabel and label passed:
 * - show deprication warning.
 * - behind the scenes:
 *   - map 'label' to 'valueLabel'
 *   - map 'rowLabel' to 'label'
 *
 * if valueLabel and label passed:
 * - no warning, new API being used
 *
 * Old was:
 *
 * Checkbox.propTypes = {
 *     ...commonProps,
 *     rowLabel: PropTypes.string,
 *     value: PropTypes.bool
 * };
 */
Checkbox.propTypes = {
    ...controlProps,
    ...commonProps,
    value: PropTypes.bool,
    valueLabel: PropTypes.string
};

Checkbox.defaultProps = {
    ...commonDefaults,
    value: false,
    valueLabel: ''
};

export default Checkbox;
