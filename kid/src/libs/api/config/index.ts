import { AxiosInstance, AxiosRequestConfig } from 'axios';

import axiosInstance from './axiosInstance';

class HttpClient {
  private axios: AxiosInstance;

  constructor({ baseURL }: { baseURL: string }) {
    this.axios = axiosInstance({ baseURL });
  }

  public get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.axios.get(url, options);
  }

  public post<T>(url: string, data: unknown, options?: AxiosRequestConfig): Promise<T> {
    return this.axios.post(url, data, options);
  }

  public put<T>(url: string, data: unknown, options?: AxiosRequestConfig): Promise<T> {
    return this.axios.put(url, data, options);
  }

  public patch<T>(url: string, data: unknown, options?: AxiosRequestConfig): Promise<T> {
    return this.axios.patch(url, data, options);
  }

  public delete<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.axios.delete(url, options);
  }
}

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
});

export default httpClient;
