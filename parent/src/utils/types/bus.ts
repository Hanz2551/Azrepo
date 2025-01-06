export type TSchedule = {
  date: string; // yyyy-MM-dd
  going: boolean;
  returning: string;
};

export type TBusScheduleBody = {
  id: number;
  month: string; // yyyy-MM
  schedule: TSchedule[];
};

export type TStudentScheduleResponse = {
  id: number;
  updatable: boolean;
  month: string; // yyyy-MM
  schedule: TSchedule[];
};

export type TSelectedMonth = {
  year: number;
  month: number;
};

export type TStudent = {
  id: number;
  name: string;
};

export type TScheduleSettingMode = 'create' | 'edit' | null;

export type TScheduleSettingStep = 'input' | 'confirm';

export type TParamsGetStudentSchedule = {
  studentId: number;
  month: string; // 'yyyy-MM'
};

export type TBusStore = {
  yearMonth: TSelectedMonth;
  students: TStudent[] | null;
  selectedStudentId: number | null;
  fetchingStudents: boolean;
  fetchingStudentSchedule: boolean;
  studentSchedule: TStudentScheduleResponse | null;
  scheduleSettingMode: TScheduleSettingMode | null;
  scheduleSettingStep: TScheduleSettingStep;
};
