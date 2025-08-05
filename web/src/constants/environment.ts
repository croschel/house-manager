export const API_DEV_URL = 'http://localhost:8000';
export const API_LOCAL_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://house-manager-1.onrender.com';
