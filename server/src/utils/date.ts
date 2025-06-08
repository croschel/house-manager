export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

export const oneYearFromNow = () => {
  return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
};

export const thirtyDaysFromNow = () => {
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
};

export const fifteenMinutesFromNow = () => {
  return new Date(Date.now() + 15 * 60 * 1000);
};

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const getMonth = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.getMonth() + 1; // JavaScript months are 0-indexed, so we add 1
};

export const getYear = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.getFullYear();
};
