/**
 * Function to create url params based on its value
 * @param obj
 * @returns string
 */
export const createUrlParams = (obj: Record<string, string | number | Date>) =>
  Object.entries(obj)
    .reduce((acc, [key, value]) => {
      if (typeof value === 'number' && value !== 0) {
        return `${acc}${key}=${value}&`;
      }
      if (
        (typeof value === 'string' || typeof value === 'object') &&
        value !== '' &&
        value !== undefined
      ) {
        return `${acc}${key}=${value}&`;
      }
      return acc;
    }, '?')
    .slice(0, -1);

/**
 * Create an array of options with labels from a given object.
 * The key of the object is used as the value of the option,
 * and the value of the object is used as the label of the option.
 * @param data - An object with string values
 * @returns An array of options with labels
 */
export const createDropOptions = (data: { [key: string]: string }) => {
  return Object.entries(data).map(([key, value]) => ({
    label: value,
    value: key
  }));
};
