'use strict';

var React = require('react');

var Icon = React.createClass({
    displayName: 'Icon',


    requiredProps: {
        symbol: React.PropTypes.string.isRequired,
        className: React.PropTypes.string
    },

    defaultProps: {
        className: ''
    },

    render: function render() {
        var className = 'glyphicon glyphicon-' + this.props.symbol + ' ' + this.props.className;
        return React.createElement('span', { className: className, 'aria-hidden': 'true' });
    }

});

module.exports = Icon;