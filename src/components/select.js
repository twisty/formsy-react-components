import React, { Component, PropTypes } from 'react';
import { commonProps } from './prop-types';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

class Select extends Component {

    handleChange = (event) => {
        var target = event.currentTarget;
        var value;
        if (this.props.multiple) {
            value = [];
            for (var i = 0; i < target.length; i++){
                var option = target.options[i];
                if (option.selected) {
                    value.push(option.value);
                }
            }
        } else {
            value = target.value;
        }
        this.props.onSetValue(value);
        this.props.onChange(this.props.name, value);
    }

    renderElement = () => {
        var optionNodes = this.props.options.map(function(item, index) {
            return (
                <option key={index} {...item} label={null}>{item.label}</option>
            );
        });
        return (
            <select
                ref="element"
                className="form-control"
                {...this.props}
                id={this.props.id}
                value={this.props.value}
                onChange={this.handleChange}
                disabled={this.props.disabled}
            >
                {optionNodes}
            </select>
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

Select.propTypes = {
    ...commonProps,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string
        })
    ).isRequired,
    multiple: PropTypes.bool
};

export default Select;
