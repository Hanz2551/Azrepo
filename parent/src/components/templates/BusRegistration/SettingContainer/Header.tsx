import IconChevronLeft from '@/components/atoms/Icon/ChevronLeft';
import { useAppDispatch } from '@/stores';
import {
  scheduleSettingStepSelector,
  yearMonthSelector,
  setScheduleSettingMode,
  setScheduleSettingStep,
} from '@/stores/bus/slice';
import { useSelector } from 'react-redux';

export default function Header({ loading }: { loading: boolean }) {
  const dispatch = useAppDispatch();

  const step = useSelector(scheduleSettingStepSelector);
  const yearMonth = useSelector(yearMonthSelector);

  const handleClickBack = () => {
    if (loading) return;
    if (step === 'input') dispatch(setScheduleSettingMode(null));
    dispatch(setScheduleSettingStep('input'));
  };

  return (
    <div className="w-full flex justify-between items-center h-[48px] px-[20px] bg-white">
      <IconChevronLeft
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={handleClickBack}
      />
      <p className="font-bold">
        <span className="font-lato">{yearMonth.month}</span>月の利用申請入力
      </p>
      <div className="w-[24px]"></div>
    </div>
  );
}
