import PageLoader from '@/components/atoms/PageLoader';
import { useAppDispatch } from '@/stores';
import { fetchingSelector, getDriverSchedule, resetStore } from '@/stores/driver/slice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import Tabs from './Tabs';
import ScheduleHistories from '@/components/molecules/ScheduleHistories';

export default function BusScheduleBus() {
  const dispatch = useAppDispatch();

  const fetching = useSelector(fetchingSelector);

  useEffect(() => {
    dispatch(getDriverSchedule());

    return () => {
      dispatch(resetStore());
    };
  }, [dispatch]);

  return (
    <div className="p-4 md:p-6">
      {fetching && <PageLoader />}

      <div className="flex justify-between">
        <h1 className="text-heading30B">乗車名簿</h1>
        <ScheduleHistories />
      </div>

      <SearchBar />

      <Tabs />
    </div>
  );
}
