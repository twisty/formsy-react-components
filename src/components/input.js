import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import { commonProps, commonDefaults } from './prop-types';
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

    render = function() {

        let control = (
            <InputControl
                {...this.props}
                value={this.state.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
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

Input.propTypes = {
    ...commonProps,
    addonAfter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    addonBefore: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    buttonAfter: PropTypes.node,
    buttonBefore: PropTypes.node,
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
    value: PropTypes.string
};

Input.defaultProps = {
    ...commonDefaults,
    type: 'text',
    value: '',
    addonBefore: null,
    addonAfter: null,
    buttonBefore: null,
    buttonAfter: null
};

export default Input;
