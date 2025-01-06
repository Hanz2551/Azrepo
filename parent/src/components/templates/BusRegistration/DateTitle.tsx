import { getDayOfWeekJa } from '@/utils/helpers/dateTime';
import { format, isSaturday, isSunday } from 'date-fns';
import { useMemo } from 'react';

export default function DateTitle({ date }: { date: string }) {
  const dateColorClass = useMemo(() => {
    return isSaturday(date)
      ? 'text-primary'
      : isSunday(date)
        ? 'text-error'
        : 'text-color-text-muted';
  }, [date]);

  return (
    <div className="flex items-center mb-4">
      <span className="font-lato text-[20px] leading-[20px] font-bold">{format(date, 'd')}</span>
      <span className="ml-1 font-bold text-one-line14">
        <span className="text-color-text-muted">(</span>
        <span className={dateColorClass}>{getDayOfWeekJa(date)}</span>
        <span className="text-color-text-muted">)</span>
      </span>
    </div>
  );
}
