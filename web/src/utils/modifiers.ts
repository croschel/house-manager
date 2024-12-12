import { v4 as uuidv4 } from 'uuid';

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

export const generateUUId = () => {
  return uuidv4();
};

/**
 * Formats a number as currency in Brazilian Real, prefixed with a dollar sign.
 * Handles undefined values and zero.
 *
 * @param value - The number to format, or undefined.
 * @returns A string representing the formatted currency value.
 */
export const formatToCurrencyRealWithDollar = (value?: number): string => {
  if (value === undefined) {
    return '$0.00';
  }

  // Use Intl.NumberFormat to format the number as currency
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });

  // Format the number and replace the BRL symbol with a dollar sign
  const formattedValue = formatter.format(value).replace('R$', '$');
  return formattedValue;
};
