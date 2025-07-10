import { API_LOCAL_URL } from '@/constants';
import axios from 'axios';
import { navigate } from './navigate';
import { PageType } from '@/models/enums';
import { store } from '@/reducers';
import { resetAllActionStatus } from '@/reducers/loading/actions';

const request = axios.create({
  baseURL: API_LOCAL_URL,
  withCredentials: true
});

const refreshTokenRequest = axios.create({
  baseURL: API_LOCAL_URL,
  withCredentials: true
});

refreshTokenRequest.interceptors.request.use((response) => response);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};
    if (status === 401 && data?.errorCode === 'InvalidAccessToken') {
      try {
        await refreshTokenRequest.get('/auth/refresh');
        store.dispatch(resetAllActionStatus());
        return refreshTokenRequest(config);
      } catch (error) {
        store.dispatch(resetAllActionStatus());
        navigate(PageType.Login);
      }
    }
  }
);

export default request;
