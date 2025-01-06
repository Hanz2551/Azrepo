import CryptoJS from 'crypto-js';
import { ACCESS_TOKEN, EXPIRES_AT, REFRESH_TOKEN } from '@/utils/constants/auth';
import { TSignInResponse } from '@/utils/types/auth';

export const encodeToken = (token: string) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, process.env.NEXT_PUBLIC_APP_NAME || '', {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encryptedToken.toString();
};

export const decodeToken = (token: string) => {
  try {
    const decryptedToken = CryptoJS.AES.decrypt(token, process.env.NEXT_PUBLIC_APP_NAME || '', {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decryptedToken.toString(CryptoJS.enc.Utf8);
  } catch {
    return '';
  }
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) return '';
  return decodeToken(accessToken);
};

export function getRefreshToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken) return '';
  return decodeToken(refreshToken);
}

export function getExpiresAt() {
  return localStorage.getItem(EXPIRES_AT);
}

export function clearAuthStorage() {
  return localStorage.clear();
}

export function setAuthStorage(data: TSignInResponse) {
  localStorage.setItem(ACCESS_TOKEN, encodeToken(data.accessToken));
  localStorage.setItem(EXPIRES_AT, data.expiresAt);
  localStorage.setItem(REFRESH_TOKEN, encodeToken(data.refreshToken));
}
