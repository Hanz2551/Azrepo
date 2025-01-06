import { TSchedule } from '@/utils/types/bus';
import {
  settingSchedule,
  daysInMonthSelector,
  scheduleSettingModeSelector,
  scheduleSettingStepSelector,
  setScheduleSettingStep,
  studentScheduleSelector,
  yearMonthSelector,
} from '@/stores/bus/slice';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/atoms/Button';
import { useAppDispatch } from '@/stores';
import FormInput from './FormInput';
import Confirm from './Confirm';
import Header from './Header';
import Head from 'next/head';
import { returningBusSelector } from '@/stores/global/slice';

export function SettingContainer() {
  const dispatch = useAppDispatch();

  const yearMonth = useSelector(yearMonthSelector);
  const daysInMonth = useSelector(daysInMonthSelector);
  const studentSchedule = useSelector(studentScheduleSelector);
  const mode = useSelector(scheduleSettingModeSelector);
  const step = useSelector(scheduleSettingStepSelector);
  const returningBus = useSelector(returningBusSelector);

  const [loading, setLoading] = useState(false);

  const [scheduleInput, setScheduleInput] = useState<TSchedule[]>(
    mode === 'create' ? [] : studentSchedule!.schedule,
  );

  const month = useMemo(() => `${yearMonth.year}-${yearMonth.month}`, [yearMonth]);

  useEffect(() => {
    if (daysInMonth.length > 0 && mode === 'create' && returningBus?.[month])
      setScheduleInput(
        daysInMonth.map((date) => ({
          date,
          going: true,
          returning: returningBus[month][0]?.value,
        })),
      );
  }, [mode, returningBus, daysInMonth, month]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const [date, direction] = e.target.name.split('_');
    setScheduleInput((prev) =>
      prev.map((item) =>
        item.date !== date
          ? item
          : {
              date,
              going: direction === 'going' ? value === 'true' : item.going,
              returning: direction === 'returning' ? value : item.returning,
            },
      ),
    );
  };

  const handleSubmit = () => {
    setLoading(true);
    dispatch(settingSchedule(scheduleInput))
      .unwrap()
      .finally(() => setLoading(false));
  };

  const handleClickNext = () => {
    if (step === 'input') dispatch(setScheduleSettingStep('confirm'));
    else handleSubmit();
  };

  return (
    <>
      <Head>
        <title>{step === 'input' ? 'バス利用申請入力' : 'バス利用申請確認'}</title>
      </Head>

      <Header loading={loading} />

      <div className="bg-regent-gray-50 h-[calc(100dvh_-_112px)]">
        <div className="px-4 pt-4 pb-[40px] flex flex-col gap-2 h-[calc(100dvh_-_112px)] overflow-y-auto">
          {step === 'input' ? (
            <FormInput
              scheduleInput={scheduleInput}
              onChange={handleChange}
              returningBus={returningBus?.[month] || []}
            />
          ) : (
            <Confirm scheduleInput={scheduleInput} />
          )}
        </div>
      </div>

      <div className="px-4 py-2 bg-[#fff] w-full">
        <Button
          className="w-full h-[48px] font-semibold rounded-[100px] text-[16px]"
          loading={loading}
          onClick={handleClickNext}
        >
          {step === 'input' ? '次へ' : '申請内容を保存'}
        </Button>
      </div>
    </>
  );
}
