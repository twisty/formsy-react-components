import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import { controlProps, commonProps, commonDefaults } from './prop-types';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import TextareaControl from './controls/textarea';

class Textarea extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this.changeDebounced = debounce(props.onSetValue, this.getDebounceInterval('change'));
        this.blurDebounced = debounce(props.onSetValue, this.getDebounceInterval('blur'));
    }

    componentWillReceiveProps = (nextProps) => {
        const isValueChanging = nextProps.value !== this.props.value;
        if (isValueChanging) {
            this.setState({value: nextProps.value});
            this.props.onSetValue(nextProps.value);
        }
    }

    shouldUpdateOn = (eventName) => {
        const updateOnEventNames = this.props.updateOn.split(' ');
        return updateOnEventNames.includes(eventName);
    }

    getDebounceInterval = (eventName) => {
        if (this.props.debounce.hasOwnProperty(eventName)) {
            return this.props.debounce[eventName];
        }
        return 0;
    }

    handleChange = (event) => {
        const value = event.currentTarget.value;
        this.setState({value: value});
        if (this.shouldUpdateOn('change')) {
            this.changeDebounced(value);
        }
        this.props.onChange(this.props.name, value);
    }

    handleBlur = (event) => {
        const value = event.currentTarget.value;
        this.setState({value: value});
        if (this.shouldUpdateOn('blur')) {
            this.changeDebounced.cancel();
            this.blurDebounced(value);
        }
        this.props.onBlur(this.props.name, value);
    }

    initElementRef = (control) => {
        this.element = control ? control.element: null;
    }

    render() {


        let inputProps = Object.assign({}, this.props);
        Object.keys(commonProps).forEach((key) => {
            delete inputProps[key];
        });

        let element = (
            <TextareaControl
                {...this.inputProps}
                value={this.state.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                ref={this.initElementRef}
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
    ...controlProps,
    ...commonProps,
    cols: PropTypes.number,
    debounce: PropTypes.object,
    rows: PropTypes.number,
    updateOn: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func
};

Textarea.defaultProps = {
    ...commonDefaults,
    cols: 0, // React doesn't render the cols attribute if it is zero
    rows: 3,
    updateOn: 'blur change',
    debounce: {
        blur: 0,
        change: 500
    },
    onBlur: () => {}
};

export default Textarea;
