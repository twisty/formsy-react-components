'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var utils = {
    commonProps: {
        name: _react.PropTypes.string.isRequired,
        onSetValue: _react.PropTypes.func.isRequired,
        disabled: _react.PropTypes.bool,
        errorMessages: _react.PropTypes.array,
        help: _react.PropTypes.string,
        id: _react.PropTypes.string,
        label: _react.PropTypes.string,
        layout: _react.PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
        showErrors: _react.PropTypes.bool,
        onChange: _react.PropTypes.func
    }
};

exports.default = utils;