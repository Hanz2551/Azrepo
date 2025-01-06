export type TToast = {
  status: 'error' | 'success';
  message: string;
};

export type TGlobalStore = {
  toast: TToast | null;
};
