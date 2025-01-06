export type TSignInResponse = {
  id: number;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

export type TFormInputsLogin = {
  loginId: string;
  password: string;
};

export type TCurrentUser = {
  id: number;
};

export type TAuthStore = {
  currentUser: TCurrentUser | null;
};
