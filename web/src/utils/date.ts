import {
  compareAsc,
  isAfter,
  parseISO,
  getYear,
  getMonth,
  format
} from 'date-fns';
import { DateRange } from 'react-day-picker';

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

export const getLast12monthsWithYear = () => {
  const newDate = new Date();
  const actualYearDate = getYear(newDate);
  const actualMonthDate = getMonth(newDate);
  const missingMonths = 12 - (actualMonthDate + 1);
  let results = [];

  for (let i = 0; i < 12; i++) {
    results.push({ year: actualYearDate, month: i });
  }
  return results
    .reverse()
    .map((result) => {
      if (result.month <= missingMonths - 1) {
        return {
          ...result,
          year: result.year - 1
        };
      }
      return result;
    })
    .reverse();
};

export const getFilteredResultsByRange = (
  from: Date | string,
  to: Date | string,
  array: any[],
  filterKey: string
) => {
  if (to === '') {
    return array.filter((item) => {
      const eventDate = format(item[filterKey], 'yyyy-MM-dd');
      return eventDate === format(from, 'yyyy-MM-dd');
    });
  }
  return array.filter((item) => {
    const eventDate = new Date(item[filterKey]);
    return eventDate >= from && eventDate <= to;
  });
};

/**
 * Checks if a given date is within a specified DateRange.
 *
 * @param date - The date to check, as a Date object or ISO 8601 string.
 * @param range - The DateRange object with `from` and optional `to` dates.
 * @returns A boolean indicating if the date is within the range.
 */
export const isDateInRange = (
  date: Date | string,
  range: DateRange
): boolean => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  if (!range.from) {
    return false; // If no start date is provided, return false.
  }

  const fromDate = range.from;
  const toDate = range.to || new Date(); // Default to current date if `to` is undefined.

  return parsedDate >= fromDate && parsedDate <= toDate;
};
