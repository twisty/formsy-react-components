import React, { Component, PropTypes } from 'react';
import { commonProps, commonDefaults } from './prop-types';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import TextareaControl from './controls/textarea';

class Textarea extends Component {

    handleChange = (event) => {
        const value = event.currentTarget.value;
        this.props.onSetValue(value);
        this.props.onChange(this.props.name, value);
    }

    render() {

        let element = (
            <TextareaControl {...this.props} />
        );

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
    ...commonDefaults,
    cols: 0, // React doesn't render the cols attribute if it is zero
    rows: 3
};

export default Textarea;
