import { API_DEV_URL } from '@/constants';
import axios from 'axios';

export const request = axios.create({
  baseURL: API_DEV_URL
});
