import { getAccessToken } from '@/utils/helpers/auth';
import Axios, { AxiosError } from 'axios';
import authAPI from '@/libs/api/auth';

const axiosInstance = ({ baseURL }: { baseURL: string }) => {
  const axios = Axios.create({
    baseURL: `${baseURL}/api/v1`,
  });

  axios.interceptors.request.use(
    async (config) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  let isRefreshing = false;
  let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (error: AxiosError) => void;
  }> = [];

  const processQueue = (error: AxiosError | null) => {
    failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(true);
      }
    });

    failedQueue = [];
  };

  axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
      const originalRequest = error.config;

      if (originalRequest.url.includes('/refresh-token')) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await authAPI.refreshAccessToken();
          processQueue(null);
          return axios(originalRequest);
        } catch (error) {
          processQueue(error as AxiosError);
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return axios;
};

export default axiosInstance;
