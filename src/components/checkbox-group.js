import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlCommon from './controls/control-common';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

class CheckboxGroup extends Component {

    constructor (props) {
        super(props);
        this.elements = {};
    }

    // Returns an array of the values of all checked items.
    handleChange = () => {
        let { options, name } = this.props;
        let checkedOptions = options.filter((option) => {
            return this.elements[option.value].checked;
        });
        let value = checkedOptions.map(option => {
            return option.value;
        });
        this.props.onSetValue(value);
        this.props.onChange(name, value);
    }

    renderElement = () => {
        const controls = this.props.options.map((checkbox, key) => {
            let checked = (this.props.value.indexOf(checkbox.value) !== -1);
            let disabled = checkbox.disabled || this.props.disabled;
            return (
                <div className="checkbox" key={key}>
                    <label>
                        <input
                            ref={(input) => { this.elements[checkbox.value] = input; }}
                            checked={checked}
                            type="checkbox"
                            value={checkbox.value}
                            onChange={this.handleChange}
                            disabled={disabled}
                        /> {checkbox.label}
                    </label>
                </div>
            );
        });
        return controls;
    }

    render() {

        let element = this.renderElement();

        if (this.props.layout === 'elementOnly') {
            return (
                <div>{element}</div>
            );
        }

        return (
            <Row
                {...this.props}
                fakeLabel={true}
            >
                {element}
                {this.props.help ? <Help help={this.props.help} /> : null}
                {this.props.showErrors ? <ErrorMessages messages={this.props.errorMessages} /> : null}
            </Row>
        );
    }
}

CheckboxGroup.propTypes = {
    ...ControlCommon.propTypes,
    ...ComponentCommon.propTypes,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            disabled: PropTypes.bool,
            value: PropTypes.string,
            label: PropTypes.string
        })
    ),
    value: PropTypes.array
};

CheckboxGroup.defaultProps = {
    ...ComponentCommon.defaultProps,
    options: [],
    value: []
};

export default CheckboxGroup;
