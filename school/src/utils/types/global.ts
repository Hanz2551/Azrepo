export type TToast = {
  status: 'error' | 'success';
  message: string;
};

export type TTableColumns<T> = ({ name: string; width: string; title: string } & Record<
  string,
  unknown
> & {
    renderer: (record: T) => React.ReactNode;
  })[];

export type TSchema<V> = Record<
  keyof V,
  {
    required?: boolean;
    maxLength?: number;
    message: string;
  }[]
>;

export type TValuesValidation = Record<string, unknown>;

export type TReturningBus = {
  key: string;
  value: string;
};

export type TGlobalStore = {
  toast: TToast | null;
  returningBus: { [month: string]: TReturningBus[] } | null;
};
