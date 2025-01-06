import {
  TBusScheduleBody,
  TParamsGetStudentSchedule,
  TStudent,
  TStudentScheduleResponse,
} from '@/utils/types/bus';
import httpClient from './config';
import { TReturningBus } from '@/utils/types/global';

async function settingSchedule(body: TBusScheduleBody) {
  return httpClient.post(`/parent/bus-schedule`, body);
}

async function getStudents() {
  return httpClient.get<TStudent[]>(`/parent/students`);
}

async function getStudentSchedule(params: TParamsGetStudentSchedule) {
  return httpClient.get<TStudentScheduleResponse>(`/parent/bus-schedule`, { params });
}

async function getReturningBus(month: string) {
  return httpClient.get<TReturningBus[]>('/parent/returning-bus', { params: { month } });
}

export default { settingSchedule, getStudents, getStudentSchedule, getReturningBus };
