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
