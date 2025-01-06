import { TSchedule } from '@/utils/types/bus';
import IconToSchool from '@/assets/icons/icon_to_school.svg';
import IconLeaveSchool from '@/assets/icons/icon_leave_school.svg';
import { RETURNING_NOT_USE_LABEL, RETURNING_NOT_USE_VALUE } from './utils';

type Props = {
  schedule: TSchedule;
};

export default function ScheduleGoingReturning({ schedule }: Props) {
  return (
    <div className="flex">
      <div className="w-[50%] flex items-start gap-2">
        <span className="p-2 rounded-[8px] bg-bright-pink-50">
          <IconToSchool />
        </span>
        <div className="flex flex-col">
          <span className="text-body14 font-medium text-color-text-muted">登校</span>
          <span className="text-one-line16B mt-[2px]">
            {schedule.going ? '利用する' : '利用しない'}
          </span>
        </div>
      </div>

      <div className="w-[50%] flex items-start gap-2">
        <span className="p-2 rounded-[8px] bg-sky-blue-50">
          <IconLeaveSchool />
        </span>
        <div className="flex flex-col">
          <span className="text-body14 font-medium text-color-text-muted">下校</span>
          <span
            className={
              schedule.returning !== RETURNING_NOT_USE_VALUE
                ? 'font-lato text-one-line20B'
                : 'text-one-line16B mt-[2px]'
            }
          >
            {schedule.returning === RETURNING_NOT_USE_VALUE
              ? RETURNING_NOT_USE_LABEL
              : schedule.returning}
          </span>
        </div>
      </div>
    </div>
  );
}
