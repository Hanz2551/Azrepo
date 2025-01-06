import {
  TBodySetting,
  TEditNotification,
  TNotificationDetail,
  TNotificationInListResponse,
} from '@/utils/types/notification';
import httpClient from './config';

async function getNotifications() {
  return httpClient.get<TNotificationInListResponse[]>(`/teacher/notification`);
}

async function getNotification(id: number) {
  return httpClient.get<TNotificationDetail>(`/teacher/notification/${id}`);
}

async function createNotification(body: TBodySetting) {
  const form = new FormData();
  form.append('title', body.title);
  form.append('to', body.to);
  form.append('content', body.content);
  form.append('startAt', body.startAt);
  form.append('endAt', body.endAt);
  if (!body.notificationFiles?.length) {
    form.append('notificationFiles', '[]');
  } else {
    body.notificationFiles?.forEach((item, index) => {
      form.append(`notificationFiles[${index}]file`, item.file as File);
    });
  }
  return httpClient.post(`/teacher/notification/create`, form);
}

async function editNotification({ id, body }: TEditNotification) {
  const form = new FormData();
  form.append('title', body.title);
  form.append('to', body.to);
  form.append('content', body.content);
  form.append('startAt', body.startAt);
  form.append('endAt', body.endAt);
  body.notificationFiles?.forEach((item, index) => {
    if ('id' in item.file) {
      form.append(`notificationFiles[${index}]id`, String(item.file.id));
      if (item.file.delete) form.append(`notificationFiles[${index}]delete`, 'true');
    } else {
      form.append(`notificationFiles[${index}]file`, item.file);
    }
  });
  return httpClient.patch(`/teacher/notification/${id}/edit`, form);
}

async function deleteNotification(id: number) {
  return httpClient.delete(`/teacher/notification/${id}/delete`);
}

export default {
  getNotifications,
  getNotification,
  createNotification,
  editNotification,
  deleteNotification,
};
