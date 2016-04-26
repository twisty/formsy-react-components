"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Help = function Help(props) {
    return _react2.default.createElement(
        "span",
        { className: "help-block" },
        props.help
    );
};

Help.propTypes = {
    help: _react.PropTypes.string.isRequired
};

exports.default = Help;