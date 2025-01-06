export type TNotification = {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
};

export type TNotificationDetail = TNotification & {
  notificationFiles?: { id: number; fileName: string; fileUrl: string }[];
};

export type TNotificationStore = {
  list: TNotification[] | null;
  detail: TNotificationDetail | null;
  reading: boolean;
};
