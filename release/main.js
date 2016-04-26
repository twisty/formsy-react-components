'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _checkbox = require('./components/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _checkboxGroup = require('./components/checkbox-group');

var _checkboxGroup2 = _interopRequireDefault(_checkboxGroup);

var _icon = require('./components/icon');

var _icon2 = _interopRequireDefault(_icon);

var _input = require('./components/input');

var _input2 = _interopRequireDefault(_input);

var _inputFile = require('./components/input-file');

var _inputFile2 = _interopRequireDefault(_inputFile);

var _radioGroup = require('./components/radio-group');

var _radioGroup2 = _interopRequireDefault(_radioGroup);

var _row = require('./components/row');

var _row2 = _interopRequireDefault(_row);

var _select = require('./components/select');

var _select2 = _interopRequireDefault(_select);

var _textarea = require('./components/textarea');

var _textarea2 = _interopRequireDefault(_textarea);

var _component = require('./mixins/component');

var _component2 = _interopRequireDefault(_component);

var _parentContext = require('./mixins/parent-context');

var _parentContext2 = _interopRequireDefault(_parentContext);

var _component3 = require('./hoc/component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FRC = {
    Checkbox: (0, _component3.FormsyReactComponent)(_checkbox2.default),
    CheckboxGroup: (0, _component3.FormsyReactComponent)(_checkboxGroup2.default),
    Input: (0, _component3.FormsyReactComponent)(_input2.default),
    File: (0, _component3.FormsyReactComponent)(_inputFile2.default),
    RadioGroup: (0, _component3.FormsyReactComponent)(_radioGroup2.default),
    Select: (0, _component3.FormsyReactComponent)(_select2.default),
    Textarea: (0, _component3.FormsyReactComponent)(_textarea2.default),
    Icon: _icon2.default,
    Row: _row2.default,
    ComponentMixin: _component2.default,
    ParentContextMixin: _parentContext2.default
};

exports.default = FRC;