import { TBusNo } from '@/utils/types/driver';
import { TDriverSchedule } from '@/utils/types/driver';
import httpClient from './config';

async function getBusesNo(month: string) {
  return httpClient.get<TBusNo[]>('/teacher/bus-no', { params: { month } });
}

async function getDriverSchedule(params: { date: string; query?: string; busNumber?: string }) {
  return httpClient.get<TDriverSchedule>(`/teacher/bus-schedule/by-bus`, { params });
}

async function downloadData(params: {
  date: string;
  query: string;
  busNumber: string;
  busName: string;
}) {
  return httpClient.get<Blob>('/teacher/bus-schedule/by-bus/download', {
    params,
    responseType: 'blob',
  });
}

export default { getDriverSchedule, getBusesNo, downloadData };
