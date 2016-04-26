import React, { Component, PropTypes } from 'react';
import { commonProps } from './utils';
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
        return (
            <div className="checkbox">
                <label>
                    <input
                        ref="element"
                        {...this.props}
                        id={this.id}
                        type="checkbox"
                        checked={this.props.value === true}
                        onChange={this.handleChange}
                        disabled={this.props.disabled}
                    /> {this.props.label}
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
                label={this.props.rowLabel}
                htmlFor={this.id}
            >
                {element}
                {this.props.help ? <Help help={this.props.help} /> : null}
                {this.props.showErrors ? <ErrorMessages messages={this.props.errorMessages} /> : null}
            </Row>
        );
    }
}

Checkbox.propTypes = {
    ...commonProps,
    rowLabel: PropTypes.string,
    value: PropTypes.bool
};

Checkbox.defaultProps = {
    label: '',
    rowLabel: '',
    value: false
};

export default Checkbox;
