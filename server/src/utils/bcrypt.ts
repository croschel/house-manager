import bcrypt from "bcrypt";

export const hashValue = async (value: string, salRounds?: number) => {
  return bcrypt.hash(value, salRounds || 10);
};

export const compareValue = async (value: string, hashedValue: string) => {
  return bcrypt.compare(value, hashedValue).catch(() => false);
};
