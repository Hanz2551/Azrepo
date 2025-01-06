export type TSearchInputs = {
  date: Date;
  query: string;
  busNumber: { label: string; value: string } | null;
};

export type TDriverScheduleItem = {
  id: number;
  name: string;
  grade: number;
};

export type TDriverSchedule = {
  [key: string]: TDriverScheduleItem[];
};

export type TBusNo = {
  key: string;
  value: string;
};

export type TStore = {
  searchInputs: TSearchInputs;
  fetching: boolean;
  driverSchedule: TDriverSchedule | null;
  busesNo: { [month: string]: { label: string; value: string }[] } | null;
  activeTabIndex: number;
};
