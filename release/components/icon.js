'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function Icon(props) {
    var classNames = ['glyphicon', 'glyphicon-' + props.symbol];
    if (props.className) {
        classNames.push(props.className);
    }
    return _react2.default.createElement('span', { className: classNames.join(' '), 'aria-hidden': 'true' });
};

Icon.propTypes = {
    symbol: _react.PropTypes.string.isRequired,
    className: _react.PropTypes.string
};

exports.default = Icon;