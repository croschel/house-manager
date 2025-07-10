import { API_LOCAL_URL } from '@/constants';
import axios from 'axios';

const request = axios.create({
  baseURL: API_LOCAL_URL,
  withCredentials: true
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
    }
  }
);

export default request;
