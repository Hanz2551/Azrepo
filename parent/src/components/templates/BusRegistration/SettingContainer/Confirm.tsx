import { TSchedule } from '@/utils/types/bus';
import DateTitle from '../DateTitle';
import ScheduleGoingReturning from '../ScheduleGoingReturning';

type Props = {
  scheduleInput: TSchedule[];
};

export default function Confirm({ scheduleInput }: Props) {
  return scheduleInput?.map((item, index) => (
    <div key={index} className="bg-white rounded-[8px] p-4">
      <DateTitle date={item.date} />
      <ScheduleGoingReturning schedule={item} />
    </div>
  ));
}
