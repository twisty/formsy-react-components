import React, { Component } from 'react';
import { commonProps } from './prop-types';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import Icon from './icon';

class File extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        }
    }

    handleChange = (event) => {
        var target = event.currentTarget;
        var value = target.value;
        this.setState({fileList: target.files});
        this.props.onSetValue(target.files);
        this.props.onChange(this.props.name, target.files, value);
    }

    renderElement = () => {
        return (
            <input
                ref="element"
                {...this.props}
                id={this.props.id}
                type="file"
                label={null}
                onChange={this.handleChange}
                disabled={this.props.disabled}
            />
        );
    }

    render() {

        let element = this.renderElement();

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

File.propTypes = {
    ...commonProps
};

export default File;
