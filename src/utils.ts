export const getDisplayName = (component: React.ComponentType<any>): string =>
  component.displayName ||
  component.name ||
  (typeof component === 'string' ? component : 'Component');

/**
 * Determine whether to show errors, or not.
 */
export const shouldShowErrors = (
  isPristine: boolean,
  isFormSubmitted: boolean,
  isValid: boolean,
  validatePristine: boolean,
  validateBeforeSubmit: boolean,
): boolean => {
  if (isPristine === true) {
    if (validatePristine === false) {
      return false;
    }
  }
  if (validateBeforeSubmit === false) {
    if (isFormSubmitted === false) {
      return false;
    }
  }
  return isValid === false;
};

export const getFallbackBoolean = <A, B>(a: A, b: B, c: boolean): boolean => {
  if (typeof a === 'boolean') {
    return a;
  }
  if (typeof b === 'boolean') {
    return b;
  }
  return c;
};

export const hashString = (inString: string): number => {
  let hash = 0;
  for (let i = 0; i < inString.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) - hash + inString.charCodeAt(i)) & 0xffffffff;
  }
  return hash;
};

/**
 * The ID is used as an attribute on the form control, and is used to allow
 * associating the label element with the form control.
 *
 * If we don't explicitly pass an `id` prop, we generate one based on the
 * `name` and `label` properties.
 */
export const getId = (
  id: string,
  label: React.ReactNode,
  name: string,
): string => {
  if (id !== '') {
    return id;
  }
  return [
    'frc',
    name.split('[').join('_').replace(']', '').replace('.', '_'),
    hashString(JSON.stringify(label)),
  ].join('-');
};
