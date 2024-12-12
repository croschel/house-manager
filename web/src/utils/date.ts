import { compareAsc, isAfter, parseISO } from 'date-fns';

/**
 * Checks if the first date is after the second date.
 *
 * @param date1 - The first date to compare, in string format (ISO 8601).
 * @param date2 - The second date to compare, in string format (ISO 8601).
 * @returns A boolean indicating if date1 is after date2.
 */
export const isDateAfter = (date1: string, date2: string): boolean => {
  // Parse the date strings into Date objects
  const parsedDate1 = parseISO(date1);
  const parsedDate2 = parseISO(date2);

  // Use isAfter to determine if the first date is after the second
  return isAfter(parsedDate1, parsedDate2);
};

/**
 * Compares two date strings for sorting purposes.
 *
 * @param date1 - The first date string, in ISO 8601 format.
 * @param date2 - The second date string, in ISO 8601 format.
 * @returns A number: negative if date1 < date2, zero if date1 == date2, positive if date1 > date2.
 */
export const compareDatesForSort = (date1: string, date2: string): number => {
  // Parse the dates using date-fns
  const parsedDate1 = parseISO(date1);
  const parsedDate2 = parseISO(date2);

  // Use compareAsc from date-fns to compare the dates
  return compareAsc(parsedDate1, parsedDate2);
};
