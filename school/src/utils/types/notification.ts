export type TFileSetting = { file: File | { id: number; delete?: boolean } };

export type TBodySetting = {
  title: string;
  content: string;
  startAt: string;
  endAt: string;
  to: string;
  notificationFiles: TFileSetting[];
};

export type TEditNotification = {
  id: number;
  body: TBodySetting;
};

export type TNotification = {
  id: number;
  title: string;
  content: string;
  startAt: string;
  endAt: string;
  to: string;
};

export type TSendStatus = 'not_send' | 'in_progress' | 'end';

export type TNotificationInListResponse = TNotification & {
  notificationFilesExists: boolean;
};

export type TNotificationInList = TNotification & {
  sendStatus: TSendStatus;
  notificationFilesExists: boolean;
};

export type TNotificationDetail = TNotification & {
  notificationFiles: { id: number; fileName: string }[];
};

export type TStore = {
  writing: boolean;
  notifications: TNotificationInList[] | null;
  notification: TNotificationDetail | null;
};
