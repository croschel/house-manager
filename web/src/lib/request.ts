import { API_LOCAL_URL } from '@/constants';
import axios from 'axios';

export const request = axios.create({
  baseURL: API_LOCAL_URL,
  withCredentials: true
});
