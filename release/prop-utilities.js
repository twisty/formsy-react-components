"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Removes component props that shouldn't be set on the form control.
var cleanProps = function cleanProps(props) {
    var

    // These props come from formsy-react
    // https://github.com/christianalfoni/formsy-react/blob/6b167cbfe15a72430ff475a92a70273e67a663f5/src/main.js#L441
    mapping = props.mapping;
    var validationErrors = props.validationErrors;
    var onSubmit = props.onSubmit;
    var onValid = props.onValid;
    var onValidSubmit = props.onValidSubmit;
    var onInvalid = props.onInvalid;
    var onInvalidSubmit = props.onInvalidSubmit;
    var onChange = props.onChange;
    var reset = props.reset;
    var preventExternalInvalidation = props.preventExternalInvalidation;
    var onSuccess = props.onSuccess;
    var onError = props.onError;
    var

    // These come from formsy-react, too?
    validationError = props.validationError;
    var validations = props.validations;
    var

    // These props are used by this library.
    addonAfter = props.addonAfter;
    var addonBefore = props.addonBefore;
    var buttonAfter = props.buttonAfter;
    var buttonBefore = props.buttonBefore;
    var elementWrapperClassName = props.elementWrapperClassName;
    var help = props.help;
    var label = props.label;
    var options = props.options;
    var labelClassName = props.labelClassName;
    var layout = props.layout;
    var rowClassName = props.rowClassName;
    var rowLabel = props.rowLabel;
    var validatePristine = props.validatePristine;

    var rest = _objectWithoutProperties(props, ["mapping", "validationErrors", "onSubmit", "onValid", "onValidSubmit", "onInvalid", "onInvalidSubmit", "onChange", "reset", "preventExternalInvalidation", "onSuccess", "onError", "validationError", "validations", "addonAfter", "addonBefore", "buttonAfter", "buttonBefore", "elementWrapperClassName", "help", "label", "options", "labelClassName", "layout", "rowClassName", "rowLabel", "validatePristine"]);

    return rest;
};

exports.cleanProps = cleanProps;