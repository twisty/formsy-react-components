'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var ParentContextMixin = {

    childContextTypes: {
        layout: _react.PropTypes.string.isRequired,
        validatePristine: _react.PropTypes.bool.isRequired,
        rowClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array, _react.PropTypes.object]),
        labelClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array, _react.PropTypes.object]),
        elementWrapperClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array, _react.PropTypes.object])
    },

    getChildContext: function getChildContext() {
        return {
            layout: this.props.layout || 'horizontal',
            validatePristine: this.props.validatePristine || false,
            rowClassName: this.props.rowClassName || '',
            labelClassName: this.props.labelClassName || '',
            elementWrapperClassName: this.props.elementWrapperClassName || ''
        };
    },

    getLayoutClassName: function getLayoutClassName() {
        return 'form-' + this.getChildContext().layout;
    }

};

exports.default = ParentContextMixin;