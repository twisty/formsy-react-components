import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import SelectControl from './controls/select';

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

    initElementRef = (control) => {
        this.element = control ? control.element: null;
    }

    render() {

        let inputProps = Object.assign({}, this.props);
        Object.keys(ComponentCommon.propTypes).forEach((key) => {
            delete inputProps[key];
        });

        let control = (
            <SelectControl
                {...inputProps}
                onChange={this.handleChange}
                ref={this.initElementRef}
            />
        )

        if (this.props.layout === 'elementOnly') {
            return control;
        }

        return (
            <Row
                {...this.props}
                htmlFor={this.props.id}
            >
                {control}
                {this.props.help ? <Help help={this.props.help} /> : null}
                {this.props.showErrors ? <ErrorMessages messages={this.props.errorMessages} /> : null}
            </Row>
        );
    }
}

Select.propTypes = {
    ...SelectControl.propTypes,
    ...ComponentCommon.propTypes,
    multiple: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
            group: PropTypes.string
        })
    )
};

Select.defaultProps = {
    ...ComponentCommon.defaultTypes,
    options: []
}

export default Select;
