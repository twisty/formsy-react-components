/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var propUtilities = require('./prop-utilities');

var Select = React.createClass({
    displayName: 'Select',


    mixins: [Formsy.Mixin, ComponentMixin],

    changeValue: function changeValue(event) {
        var target = event.currentTarget;
        var value;
        if (this.props.multiple) {
            value = [];
            for (var i = 0; i < target.length; i++) {
                var option = target.options[i];
                if (option.selected) {
                    value.push(option.value);
                }
            }
        } else {
            value = target.value;
        }
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    render: function render() {

        if (this.getLayout() === 'elementOnly') {
            return this.renderElement();
        }

        return React.createElement(
            Row,
            _extends({}, this.getRowProperties(), {
                htmlFor: this.getId()
            }),
            this.renderElement(),
            this.renderHelp(),
            this.renderErrorMessage()
        );
    },

    renderElement: function renderElement() {
        var _this = this;

        var renderOption = function renderOption(item, key) {
            var group = item.group,
                label = item.label,
                rest = _objectWithoutProperties(item, ['group', 'label']);

            return React.createElement(
                'option',
                _extends({ key: key }, rest),
                item.label
            );
        };

        var options = this.props.options;

        var groups = options.filter(function (item) {
            return item.group;
        }).map(function (item) {
            return item.group;
        });
        // Get the unique items in group.
        groups = [].concat(_toConsumableArray(new Set(groups)));

        var optionNodes = [];

        if (groups.length == 0) {
            optionNodes = options.map(function (item, index) {
                return renderOption(item, index);
            });
        } else {
            // For items without groups.
            var itemsWithoutGroup = options.filter(function (item) {
                return !item.group;
            });

            itemsWithoutGroup.forEach(function (item, index) {
                optionNodes.push(renderOption(item, 'no-group-' + index));
            });

            groups.forEach(function (group, groupIndex) {

                var groupItems = options.filter(function (item) {
                    return item.group === group;
                });

                var groupOptionNodes = groupItems.map(function (item, index) {
                    return renderOption(item, groupIndex + '-' + index);
                });

                optionNodes.push(React.createElement(
                    'optgroup',
                    { label: group, key: groupIndex },
                    groupOptionNodes
                ));
            });
        }
        return React.createElement(
            'select',
            _extends({
                ref: function ref(c) {
                    return _this.element = c;
                },
                className: 'form-control'
            }, propUtilities.cleanProps(this.props), {
                id: this.getId(),
                value: this.getValue(),
                onChange: this.changeValue,
                disabled: this.isFormDisabled() || this.props.disabled
            }),
            optionNodes
        );
    }
});

module.exports = Select;