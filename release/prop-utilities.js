"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Removes component props that shouldn't be set on the form control.
var cleanProps = function cleanProps(props) {
    var mapping = props.mapping,
        validationErrors = props.validationErrors,
        onSubmit = props.onSubmit,
        onValid = props.onValid,
        onValidSubmit = props.onValidSubmit,
        onInvalid = props.onInvalid,
        onInvalidSubmit = props.onInvalidSubmit,
        onChange = props.onChange,
        reset = props.reset,
        preventExternalInvalidation = props.preventExternalInvalidation,
        onSuccess = props.onSuccess,
        onError = props.onError,
        validationError = props.validationError,
        validations = props.validations,
        addonAfter = props.addonAfter,
        addonBefore = props.addonBefore,
        buttonAfter = props.buttonAfter,
        buttonBefore = props.buttonBefore,
        elementWrapperClassName = props.elementWrapperClassName,
        help = props.help,
        label = props.label,
        options = props.options,
        labelClassName = props.labelClassName,
        layout = props.layout,
        rowClassName = props.rowClassName,
        rowLabel = props.rowLabel,
        validatePristine = props.validatePristine,
        rest = _objectWithoutProperties(props, ["mapping", "validationErrors", "onSubmit", "onValid", "onValidSubmit", "onInvalid", "onInvalidSubmit", "onChange", "reset", "preventExternalInvalidation", "onSuccess", "onError", "validationError", "validations", "addonAfter", "addonBefore", "buttonAfter", "buttonBefore", "elementWrapperClassName", "help", "label", "options", "labelClassName", "layout", "rowClassName", "rowLabel", "validatePristine"]);

    return rest;
};

exports.cleanProps = cleanProps;