import { formatInTimeZone, format, fromZonedTime, toZonedTime } from 'date-fns-tz';
import { TIME_FORMAT, TIME_ZONE_JP } from '@/utils/constants/dateTime';
import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';
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

export const getStartOfMonthInJP = (date: Date | string) => {
  return fromJpTime(startOfMonth(date));
};

export const getEndOfMonthInJP = (date: Date | string) => {
  return fromJpTime(endOfMonth(date));
};

export const getAllDatesBetween = (startDate: Date | string, endDate: Date | string) => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

/** month: 1 -> 12 */
export const getDaysInMonth = (year: number, month: number) => {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(new Date(year, month - 1));
  return eachDayOfInterval({ start, end }).map((date) => format(date, 'yyyy-MM-dd'));
};

export const getDayOfWeekJa = (date: Date | string) => format(date, 'EEEEE', { locale: ja });

export const getDayOfWeekInJapanese = (date: Date | string) => {
  return format(toJpTime(date), 'EEEEE', { locale: ja });
};
