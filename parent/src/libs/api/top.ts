import { TTopResponse } from '@/utils/types/top';
import httpClient from './config';

async function getTopData() {
  return httpClient.get<TTopResponse>(`/parent/top`);
}

export default { getTopData };
