export type TStudentScheduleInList = {
  id: number;
  name: string;
  grade: number;
  going: boolean | null;
  returning: string | null; // X(notUse) | null(unRegistered) | time(use)
  returningBusName: string;
};

export enum EGoing {
  use = 'use',
  notUse = 'notUse',
  unregistered = 'unregistered',
}

export enum EReturning {
  use = 'use',
  notUse = 'notUse',
  unregistered = 'unregistered',
}

export type TFetchStudentsScheduleParams = {
  date: string;
  query?: string; // name
  grade?: string;
  going?: string;
  returning?: string;
};

export type TFetchStudentScheduleParams = {
  month: string;
  id: number;
};

export type TSearchInputs = {
  date: Date;
  query?: string; // name
  grade?: string[];
  going?: EGoing[];
  returning?: EReturning[];
};

export type TCount = {
  going: {
    use: number;
    notUse: number;
    unregistered: number;
  };
  returning: {
    use: number;
    notUse: number;
    unregistered: number;
  };
  grades: Record<string, number>;
};

export type TStudentScheduleInDetail = {
  date: string;
  going: boolean;
  returning: string;
  returningBusName: string;
};

export type TStudentScheduleDetail = {
  id: number;
  name: string;
  month: string;
  schedule: TStudentScheduleInDetail[];
};

export type TEditDateScheduleBody = {
  studentId: number;
  body: {
    month: string;
    schedule: {
      date: string;
      going: boolean;
      returning: string;
    }[];
  };
};

export type TScheduleHistory = {
  studentId: number;
  studentName: string;
  editorType: string;
  editorId: string;
  previousState: string;
  newState: string;
  date: string;
  editedAt: string;
};

export type TStore = {
  searchInputs: TSearchInputs;
  studentsSchedule: TStudentScheduleInList[] | null;
  studentsScheduleCount: TCount | null;
  fetchingStudentsSchedule: boolean;
  selectedMonth: string | null;
  studentSchedule: TStudentScheduleDetail | null;
  fetchingStudentSchedule: boolean;
};
