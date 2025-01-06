import { studentScheduleSelector } from '@/stores/bus/slice';
import { useSelector } from 'react-redux';
import IconPen from '@/components/atoms/Icon/IconPen';
import DateTitle from '../DateTitle';
import ScheduleGoingReturning from '../ScheduleGoingReturning';

type Props = {
  onClickEdit: () => void;
};

export default function StudentSchedule({ onClickEdit }: Props) {
  const studentSchedule = useSelector(studentScheduleSelector);

  return (
    <div className="relative bg-regent-gray-50 h-[calc(100dvh_-_156px)]">
      <div className="px-4 pt-4 pb-[40px] flex flex-col gap-2 h-[calc(100dvh_-_156px)] overflow-y-auto">
        {studentSchedule?.schedule?.map((schedule, index) => (
          <div key={index} className="bg-white rounded-[8px] p-4">
            <DateTitle date={schedule.date} />
            <ScheduleGoingReturning schedule={schedule} />
          </div>
        ))}

        <button
          className="absolute z-[1] right-[16px] bottom-[16px] inline-flex flex-col gap-[4px] w-[64px] h-[64px] items-center justify-center bg-primary rounded-full shadow-popper focus:ring-2 ring-offset-2 ring-sky-blue-700"
          onClick={onClickEdit}
        >
          <IconPen className="text-white" />
          <span className="text-one-line14 text-white">編集</span>
        </button>
      </div>
    </div>
  );
}
