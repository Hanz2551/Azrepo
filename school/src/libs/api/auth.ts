import { TFormInputsLogin, TSignInResponse } from '@/utils/types/auth';
import httpClient from './config';
import { getRefreshToken, setAuthStorage } from '@/utils/helpers/auth';

async function login(body: TFormInputsLogin) {
  return httpClient.post<TSignInResponse>(`/teacher/login`, body);
}

async function refreshAccessToken() {
  try {
    const refreshToken = getRefreshToken();
    const response = await httpClient.post<TSignInResponse>(
      `/teacher/refresh-token`,
      {},
      {
        headers: {
          'X-Refresh-Token': refreshToken,
        },
      },
    );
    setAuthStorage(response);
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function logout() {
  try {
    await httpClient.delete(`/teacher/logout`);
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default { login, logout, refreshAccessToken };
