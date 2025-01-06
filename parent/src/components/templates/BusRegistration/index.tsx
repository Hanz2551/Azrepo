import { useEffect } from 'react';
import ViewContainer from './ViewContainer';
import { SettingContainer } from './SettingContainer';
import {
  fetchingStudentsSelector,
  getStudents,
  resetStore,
  scheduleSettingModeSelector,
} from '@/stores/bus/slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/stores';
import PageLoader from '@/components/atoms/PageLoader';

export default function BusRegistration() {
  const dispatch = useAppDispatch();

  const fetchingStudents = useSelector(fetchingStudentsSelector);
  const mode = useSelector(scheduleSettingModeSelector);

  useEffect(() => {
    dispatch(getStudents());

    return () => {
      dispatch(resetStore());
    };
  }, []); // eslint-disable-line

  if (fetchingStudents) return <PageLoader />;

  return (
    <div className="relative flex flex-col h-[100dvh]">
      {!mode ? <ViewContainer /> : <SettingContainer />}
    </div>
  );
}
