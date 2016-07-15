import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import { commonProps, commonDefaults } from './prop-types';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import TextareaControl from './controls/textarea';

class Textarea extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this.changeDebounced = debounce(props.onSetValue, props.getDebounceInterval('change'));
        this.blurDebounced = debounce(props.onSetValue, props.getDebounceInterval('blur'));
    }

    handleChange = (event) => {
        const value = event.currentTarget.value;
        this.setState({value: value});
        if (this.props.shouldUpdateOn('change')) {
            this.changeDebounced(value);
        }
        this.props.onChange(this.props.name, value);
    }

    handleBlur = (event) => {
        const value = event.currentTarget.value;
        this.setState({value: value});
        if (this.props.shouldUpdateOn('blur')) {
            this.changeDebounced.cancel();
            this.blurDebounced(value);
        }
        this.props.onBlur(this.props.name, value);
    }

    render() {

        let element = (
            <TextareaControl
                {...this.props}
                value={this.state.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
            />
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
