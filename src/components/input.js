import React, { Component, PropTypes } from 'react';
import { commonProps, commonDefaults } from './prop-types';
import ErrorMessages from './error-messages';
import Help from './help';
import Icon from './icon';
import InputControl from './controls/input';
import InputGroup from './input-group';
import Row from './row';

class Input extends Component {

    handleChange = (event) => {
        const value = event.currentTarget.value;
        this.props.onSetValue(value);
        this.props.onChange(this.props.name, value);
    }

    render = function() {

        let control = (
            <InputControl
                {...this.props}
                onChange={this.handleChange}
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
