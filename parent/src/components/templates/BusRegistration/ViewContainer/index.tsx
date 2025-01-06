import FooterTop from '@/components/molecules/FooterTop';
import { cn } from '@/utils/helpers/tailwind';
import Button from '@/components/atoms/Button';
import StudentSchedule from './StudentSchedule';
import { useCallback, useEffect, useMemo } from 'react';
import {
  fetchingStudentScheduleSelector,
  getStudentSchedule,
  selectedStudentIdSelector,
  setScheduleSettingMode,
  setSelectedStudentId,
  setYearMonth,
  studentScheduleSelector,
  studentsSelector,
  yearMonthSelector,
} from '@/stores/bus/slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/stores';
import PageLoader from '@/components/atoms/PageLoader';
import MonthPicker from '@/components/molecules/MonthPicker';
import { TSelectedMonth } from '@/utils/types/bus';
import IconHouseGlass from '@/assets/icons/icon_house_glass.svg';
import IconPen from '@/components/atoms/Icon/IconPen';
import IconBus from '@/components/atoms/Icon/IconBus';

export default function ViewContainer() {
  const dispatch = useAppDispatch();

  const students = useSelector(studentsSelector);
  const selectedStudentId = useSelector(selectedStudentIdSelector);
  const studentSchedule = useSelector(studentScheduleSelector);
  const fetchingSchedule = useSelector(fetchingStudentScheduleSelector);
  const yearMonth = useSelector(yearMonthSelector);

  useEffect(() => {
    if (!students?.length) return;
    if (!studentSchedule) {
      dispatch(getStudentSchedule());
    }
  }, [students, studentSchedule, dispatch]);

  const handleClickCreateSchedule = useCallback(() => {
    dispatch(setScheduleSettingMode('create'));
  }, [dispatch]);

  const handleClickEdit = useCallback(() => {
    dispatch(setScheduleSettingMode('edit'));
  }, [dispatch]);

  const handleClickStudent = (id: number) => {
    if (id !== selectedStudentId) {
      dispatch(setSelectedStudentId(id));
    }
  };

  const handleChangeYearMonth = (params: Partial<TSelectedMonth>) => {
    dispatch(setYearMonth(params));
  };

  const scheduleRender = useMemo(() => {
    if (!studentSchedule)
      return (
        <div className="flex items-center justify-center bg-regent-gray-50 h-[calc(100dvh_-_156px)]" />
      );
    if (!studentSchedule.updatable)
      return (
        <div className="flex items-center justify-center bg-regent-gray-50 h-[calc(100dvh_-_156px)]">
          <div className="my-auto text-center">
            <IconHouseGlass className="inline-block" />
            <p className="text-body16 font-medium mt-2">
              {yearMonth.month}月分のスケジュールを作成中のため
              <br />
              入力はまだできません。
            </p>
          </div>
        </div>
      );
    if (!studentSchedule.schedule?.length)
      return (
        <div className="flex items-center justify-center bg-regent-gray-50 h-[calc(100dvh_-_156px)]">
          <div className="my-auto w-full max-w-[400px] text-center p-4">
            <IconPen className="inline-block text-regent-gray-600" width={32} height={32} />
            <p className="text-body16 font-medium mt-2">
              {yearMonth.month}月の利用申請はまだ入力されていません
            </p>
            <Button
              className="h-[48px] w-full rounded-full mt-4 text-[16px]"
              onClick={handleClickCreateSchedule}
            >
              利用申請を入力
            </Button>
          </div>
        </div>
      );
    return <StudentSchedule onClickEdit={handleClickEdit} />;
  }, [studentSchedule, yearMonth.month, handleClickEdit, handleClickCreateSchedule]);

  if (!students?.length)
    return (
      <>
        <div className="w-full flex justify-center items-center h-[48px] bg-white">
          <MonthPicker value={yearMonth} onChange={handleChangeYearMonth} />
        </div>
        <div className="h-[calc(100dvh_-_116px)] flex flex-col items-center justify-center gap-2">
          <IconBus width={32} height={32} className="text-regent-gray-600" />
          <p className="text-body16 font-medium text-center">
            バスの利用申請を行うためには
            <br />
            子供の登録が必要です
          </p>
        </div>
        <FooterTop />
      </>
    );

  return (
    <>
      <div className="w-full flex justify-center items-center h-[48px] bg-white">
        <MonthPicker value={yearMonth} onChange={handleChangeYearMonth} />
      </div>
      <ul className="w-full h-[40px] min-h-[40px] flex bg-white overflow-x-auto">
        {students.map((student) => (
          <li
            key={student.id}
            className={cn(
              'inline-flex items-start h-[40px] px-4 pt-[8px] transition-all border-b-[2px] whitespace-nowrap font-medium',
              selectedStudentId === student.id
                ? 'text-primary border-primary'
                : 'text-color-text-muted border-white cursor-pointer',
            )}
            onClick={() => handleClickStudent(student.id)}
          >
            <span className="inline-block text-one-line14">{student.name}</span>
          </li>
        ))}
      </ul>
      {fetchingSchedule && <PageLoader />}
      {scheduleRender}
      <FooterTop />
    </>
  );
}
