import {
  TCount,
  TEditDateScheduleBody,
  TFetchStudentScheduleParams,
  TFetchStudentsScheduleParams,
  TScheduleHistory,
  TStudentScheduleDetail,
  TStudentScheduleInList,
} from '@/utils/types/bus';
import httpClient from './config';
import { TReturningBus } from '@/utils/types/global';

async function getStudentsSchedule(params: TFetchStudentsScheduleParams) {
  return httpClient.get<{ students: TStudentScheduleInList[]; aggCount: TCount }>(
    `/teacher/bus-schedule/by-students`,
    { params },
  );
}

async function getStudentSchedule({ month, id }: TFetchStudentScheduleParams) {
  return httpClient.get<TStudentScheduleDetail>(`/teacher/bus-schedule/by-students/${id}`, {
    params: { month },
  });
}

async function editStudentDateSchedule({ studentId, body }: TEditDateScheduleBody) {
  return httpClient.post<TStudentScheduleDetail>(
    `/teacher/bus-schedule/by-students/${studentId}/edit`,
    body,
  );
}

async function getReturningBus(month: string) {
  return httpClient.get<TReturningBus[]>('/teacher/returning-bus', { params: { month } });
}

async function getScheduleHistories(studentId?: number) {
  return httpClient.get<TScheduleHistory[]>('/teacher/bus-schedule/update-log', {
    ...(studentId && { params: { studentId } }),
  });
}

export default {
  getStudentsSchedule,
  getStudentSchedule,
  editStudentDateSchedule,
  getReturningBus,
  getScheduleHistories,
};
