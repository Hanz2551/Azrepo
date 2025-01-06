import { TTopData } from '@/utils/types/top';
import httpClient from './config';

async function getTopData() {
  return httpClient.get<TTopData>(`/student/bus-schedule/upcoming`);
}

export default { getTopData };
