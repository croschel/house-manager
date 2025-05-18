import dotenv from "dotenv";

dotenv.config();

export const REFRESH_PATH = "/auth/refresh";

const getEnv = (key: string, defaultValue?: string) => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const ENV = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  APP_ORIGIN: getEnv("APP_ORIGIN", "http://localhost:3000"),
  MONGO_URL: getEnv("MONGO_URL"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
  PORT: getEnv("PORT", "4000"),
  EMAIL_SENDER: getEnv("EMAIL_SENDER"),
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
};
