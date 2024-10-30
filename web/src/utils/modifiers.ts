/**
 * Given a string, capitalize the first letter of the string.
 *
 * @example
 * capitalizeFirstLetter('hello') // 'Hello'
 * capitalizeFirstLetter('') // ''
 * @param {string} str The string to capitalize.
 * @returns {string} A new string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
