import React, { Component, PropTypes } from 'react';
import { commonProps } from './utils';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

class RadioGroup extends Component {

    handleChange = (event) => {
        var value = event.currentTarget.value;
        this.props.onSetValue(value);
        this.props.onChange(this.props.name, value);
    }

    renderElement = () => {
        const controls = this.props.options.map((radio, key) => {
            let checked = (this.props.value === radio.value);
            let disabled = radio.disabled || this.props.disabled;
            let className = 'radio' + (disabled ? ' disabled' : '');
            if (this.props.type === 'inline') {
                return (
                    <label className="radio-inline" key={key}>
                        <input
                            ref={'element-' + key}
                            checked={checked}
                            type="radio"
                            value={radio.value}
                            onChange={this.handleChange}
                            disabled={disabled}
                        /> {radio.label}
                    </label>
                );
            }
            return (
                <div className={className} key={key}>
                    <label>
                        <input
                            ref={'element-' + key}
                            checked={checked}
                            type="radio"
                            value={radio.value}
                            onChange={this.handleChange}
                            disabled={disabled}
                        /> {radio.label}
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

RadioGroup.propTypes = {
    ...commonProps,
    options: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['inline', 'stacked'])
};

RadioGroup.defaultProps = {
    type: 'stacked',
    label: '',
    help: null
};

export default RadioGroup;
