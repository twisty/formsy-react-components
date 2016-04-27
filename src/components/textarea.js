import React, { Component, PropTypes } from 'react';
import { commonProps } from './prop-types';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

class Textarea extends Component {

    handleChange = (event) => {
        const value = event.currentTarget.value;
        this.props.onSetValue(value);
        this.props.onChange(this.props.name, value);
    }

    renderElement = () => {
        return (
            <textarea
                ref="element"
                className="form-control"
                {...this.props}
                id={this.props.id}
                value={this.props.value}
                onChange={this.handleChange}
                disabled={this.props.disabled}
            ></textarea>
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
                htmlFor={this.props.id}
            >
                {element}
                {this.props.help ? <Help help={this.props.help} /> : null}
                {this.props.showErrors ? <ErrorMessages messages={this.props.errorMessages} /> : null}
            </Row>
        );
    }
}

Textarea.propTypes = {
    ...commonProps,
    cols: PropTypes.number,
    rows: PropTypes.number,
    value: PropTypes.string
};

Textarea.defaultProps = {
    cols: 0, // React doesn't render the cols attribute if it is zero
    rows: 3
};

export default Textarea;
