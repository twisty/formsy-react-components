import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wraps an input to implement a Bootstrap [Input Group](http://getbootstrap.com/components/#input-groups)
 */
const InputGroup = (props) => {

    const renderAddon = (addon) => {
        if (!addon) {
            return null;
        }
        return (
            <span className="input-group-addon">{addon}</span>
        );
    }

    const renderButton = (button) => {
        if (!button) {
            return null;
        }
        return (
            <span className="input-group-btn">{button}</span>
        );
    }

    return (
        <div className="input-group">
            {renderAddon(props.addonBefore)}
            {renderButton(props.buttonBefore)}
            {props.children}
            {renderAddon(props.addonAfter)}
            {renderButton(props.buttonAfter)}
        </div>
    );
}

InputGroup.propTypes = {
    addonAfter: PropTypes.node,
    addonBefore: PropTypes.node,
    buttonAfter: PropTypes.node,
    buttonBefore: PropTypes.node,
    children: PropTypes.node
}

export default InputGroup;
