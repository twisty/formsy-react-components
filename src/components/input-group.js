import React, { Component, PropTypes } from 'react';

class InputGroup extends Component {

    renderAddon = (addon) => {
        if (!addon) {
            return null;
        }
        return (
            <span className="input-group-addon">{addon}</span>
        );
    }

    renderButton = (button) => {
        if (!button) {
            return null;
        }
        return (
            <span className="input-group-btn">{button}</span>
        );
    }

    render() {
        return (
            <div className="input-group">
                {this.renderAddon(this.props.addonBefore)}
                {this.renderButton(this.props.buttonBefore)}
                {this.props.children}
                {this.renderAddon(this.props.addonAfter)}
                {this.renderButton(this.props.buttonAfter)}
            </div>
        );
    }
}

InputGroup.propTypes = {
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
    children: PropTypes.node
}

export default InputGroup;
