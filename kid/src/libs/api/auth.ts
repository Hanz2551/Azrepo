import httpClient from './config';

async function login(cipher: string) {
  return httpClient.post<TCurrentUser>(`/student/login_qrcode`, {
    cipher,
  });
}

export default { login };
