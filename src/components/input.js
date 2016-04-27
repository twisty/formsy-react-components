import React, { Component, PropTypes } from 'react';
import { commonProps } from './prop-types';
import ErrorMessages from './error-messages';
import Help from './help';
import Icon from './icon';
import Row from './row';

class Input extends Component {

    handleChange = (event) => {
        const value = event.currentTarget.value;
        this.props.onSetValue(value);
        this.props.onChange(this.props.name, value);
    }

    renderElement = function() {
        let className = 'form-control';
        if (['range'].indexOf(this.props.type) !== -1) {
            className = null;
        }
        return (
            <input
                ref="element"
                className={className}
                {...this.props}
                id={this.props.id}
                label={null}
                value={this.props.value}
                onChange={this.handleChange}
            />
        );
    }

    // TODO: split input group rendering out into another component
    renderInputGroup = function(element) {
        return (
            <div className="input-group">
                {this.renderAddon(this.props.addonBefore)}
                {this.renderButton(this.props.buttonBefore)}
                {element}
                {this.renderAddon(this.props.addonAfter)}
                {this.renderButton(this.props.buttonAfter)}
            </div>
        );
    }

    renderAddon = function(addon) {
        if (!addon) {
            return false;
        }
        return (
            <span className="input-group-addon">{addon}</span>
        );
    }

    renderButton = function(button) {
        if (!button) {
            return false;
        }
        return (
            <span className="input-group-btn">{button}</span>
        );
    }

    render = function() {
        let element = this.renderElement();

        if (this.props.type === 'hidden') {
            return element;
        }

        if (this.props.addonBefore || this.props.addonAfter || this.props.buttonBefore || this.props.buttonAfter) {
            element = this.renderInputGroup(element);
        }

        if (this.props.layout === 'elementOnly') {
            return element;
        }

        let warningIcon = null;
        if (this.props.showErrors) {
            warningIcon = (
                <Icon symbol="remove" className="form-control-feedback" />
            );
        }

        return (
            <Row
                {...this.props}
                htmlFor={this.props.id}
            >
                {element}
                {warningIcon}
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
    type: 'text',
    value: '',
    addonBefore: null,
    addonAfter: null,
    buttonBefore: null,
    buttonAfter: null
};

export default Input;
