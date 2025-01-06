import { formatInTimeZone, format, toZonedTime, fromZonedTime } from 'date-fns-tz';
import { TIME_FORMAT, TIME_ZONE_JP } from '@/utils/constants/dateTime';
import { endOfDay, startOfDay } from 'date-fns';
import { ja } from 'date-fns/locale';

export function formatDate(date?: Date | string) {
  if (!date) return '';
  return format(date, TIME_FORMAT.DATE);
}

export function formatTimeJP(date: Date | string, format = TIME_FORMAT.DATE) {
  return formatInTimeZone(new Date(date), TIME_ZONE_JP, format);
}

export const toJpTime = (date: Date | string) => toZonedTime(date, TIME_ZONE_JP);

export const fromJpTime = (date: Date | string) => fromZonedTime(date, TIME_ZONE_JP);

export const startOfDayJP = (date: Date | string) => fromZonedTime(startOfDay(date), TIME_ZONE_JP);

export const endOfDayJP = (date: Date | string) => fromZonedTime(endOfDay(date), TIME_ZONE_JP);

export const getDayOfWeekJa = (date: Date | string) => format(date, 'EEEEE', { locale: ja });
