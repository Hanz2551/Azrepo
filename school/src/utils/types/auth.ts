export type TSignInResponse = TCurrentUser & {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

export type TFormInputsLogin = {
  loginId: string;
  password: string;
};

export enum EUserType {
  TEACHER = 1,
  DRIVER = 2,
}

export type TCurrentUser = {
  id: number;
  username: string;
  userType: EUserType;
  loginId: string;
};

export type TAuthStore = {
  currentUser: TCurrentUser | null;
};
