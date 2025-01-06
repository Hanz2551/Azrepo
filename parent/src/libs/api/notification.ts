import { TNotification, TNotificationDetail } from '@/utils/types/notification';
import httpClient from './config';

async function getListNotifications() {
  return httpClient.get<TNotification[]>(`/parent/notification`);
}

async function getNotification(id: number) {
  return httpClient.get<TNotificationDetail>(`/parent/notification/${id}`);
}

export default { getListNotifications, getNotification };
