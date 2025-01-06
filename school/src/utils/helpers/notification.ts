import { isBefore } from 'date-fns';
import { TSendStatus } from '@/utils/types/notification';
import { endOfDayJP, startOfDayJP, toJpTime } from './dateTime';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '@/utils/constants/notification';

export const getSendStatus = (startAt: string, endAt: string): TSendStatus => {
  const today = toJpTime(new Date());
  const start = startOfDayJP(startAt);
  const end = endOfDayJP(endAt);
  if (isBefore(today, start)) return 'not_send';
  if (isBefore(end, today)) return 'end';
  return 'in_progress';
};

export const validateFileUpload = (file: File) => {
  const [type] = file.type.split('/').slice(-1);
  if (!ACCEPTED_FILE_TYPES.includes(type))
    return 'このファイル形式はサポートされていません。許可されているファイル形式でアップロードしてください。';
  if (file.size > MAX_FILE_SIZE)
    return '選択したファイルは3MBを超えています。別のファイルをアップロードしてください。';
};
