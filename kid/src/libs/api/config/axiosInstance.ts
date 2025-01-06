import Axios from 'axios';
import { store } from '@/stores';

const axiosInstance = ({ baseURL }: { baseURL: string }) => {
  const axios = Axios.create({
    baseURL: `${baseURL}/api/v1`,
  });

  axios.interceptors.request.use(
    async (config) => {
      const accessToken = store.getState().auth.currentUser?.accessToken;
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
      return Promise.reject(error);
    },
  );

  return axios;
};

export default axiosInstance;
