export type TTopResponse = {
  existsUnreadNotification: boolean;
  notifications: { id: number; title: string }[];
  students: { id: number; name: string; going: string; returning: string }[];
  scheduledCurrentMonth: boolean;
  scheduledNextMonth: boolean;
};

export type TTopStore = {
  data: TTopResponse | null;
  reading: boolean;
};
