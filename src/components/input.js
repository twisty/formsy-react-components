import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Icon from './icon';
import InputControl from './controls/input';
import InputGroup from './input-group';
import Row from './row';

class Input extends Component {

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
        Object.keys(ComponentCommon.propTypes).forEach((key) => {
            delete inputProps[key];
        });
        delete inputProps.addonAfter;
        delete inputProps.addonBefore;
        delete inputProps.buttonAfter;
        delete inputProps.buttonBefore;
        delete inputProps.debounce;
        delete inputProps.updateOn;
        delete inputProps.value;
        delete inputProps.onBlur;

        let control = (
            <InputControl
                {...inputProps}
                value={this.state.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                ref={this.initElementRef}
            />
        );

        if (this.props.type === 'hidden') {
            return control;
        }

        if (this.props.addonBefore || this.props.addonAfter || this.props.buttonBefore || this.props.buttonAfter) {
            control = (
                <InputGroup {...this.props}>
                    {control}
                </InputGroup>
            );
        }

        if (this.props.layout === 'elementOnly') {
            return control;
        }

        return (
            <Row
                {...this.props}
                htmlFor={this.props.id}
            >
                {control}
                {this.props.showErrors ? <Icon symbol="remove" className="form-control-feedback" /> : null}
                {this.props.help ? <Help help={this.props.help} /> : null}
                {this.props.showErrors ? <ErrorMessages messages={this.props.errorMessages} /> : null}
            </Row>
        );
    }

}

let [ ...inputGroupPropTypes ] = InputControl.propTypes;
delete inputGroupPropTypes.children; 

Input.propTypes = {
    ...InputControl.propTypes,
    ...inputGroupPropTypes,
    ...ComponentCommon.propTypes,
    debounce: PropTypes.object,
    type: PropTypes.oneOf([
        'color',
        'date',
        'datetime',
        'datetime-local',
        'email',
        'hidden',
        'month',
        'number',
        'password',
        'range',
        'search',
        'tel',
        'text',
        'time',
        'url',
        'week'
    ]),
    updateOn: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func
};

Input.defaultProps = {
    ...ComponentCommon.defaultProps,
    ...InputGroup.defaultProps,
    type: 'text',
    value: '',
    updateOn: 'blur change',
    debounce: {
        blur: 0,
        change: 500
    },
    onBlur: () => {}
};

export default Input;
