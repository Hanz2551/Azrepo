export type TToast = {
  status: 'error' | 'success';
  message: string;
};

export type TReturningBus = {
  key: string;
  value: string;
};

export type TGlobalStore = {
  toast: TToast | null;
  returningBus: {
    [month: string]: TReturningBus[]; // month: yyyy-MM
  } | null;
};
