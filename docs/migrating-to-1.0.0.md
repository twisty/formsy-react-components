# Migrating to v1.0.0

## refs

Each component exposes refs to form control DOM elements of the component. 

For components that wrap a single element (`<Input />`, `<Select />`, `<Textarea />` etc.) the `ref` is named "`element`".

```jsx
// Component with single control
queryInputElement = searchInput.element.focus();
```

For components that wrap multiple form elements (`<CheckboxGroup />`, `<RadioGroup />`) the ref is named `elements`, this is an object where each form control is keyed by the `value` for that element.

**Breaking change:** These elements were previously stored as seperate refs on the component, named "`element-`" and then the name of the key for that element, e.g. `element-foo`.

```jsx
// Components with multiple controls

// Old
termsCheckboxElement = annoyingCheckboxes.element-agree-to-terms;

// New
termsCheckboxElement = annoyingCheckboxes.elements['agree-to-terms'];
```

## Checkbox component

**Breaking change:** The expected props for this component have been changed for consistency with the other components.

```jsx
// Old
Checkbox.propTypes = {
    ...commonProps,
    label: PropTypes.string,    // label for the checkbox
    rowLabel: PropTypes.string, // label for the row
    value: PropTypes.bool       // checkbox checked
};

// New:
Checkbox.propTypes = {
    ...commonProps,
    label: PropTypes.string,      // label for the row
    valueLabel: PropTypes.string, // label for the checkbox
    value: PropTypes.bool         // checkbox checked
};
```
