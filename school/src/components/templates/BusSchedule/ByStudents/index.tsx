import Button from '@/components/atoms/Button';
import { useAppDispatch } from '@/stores';
import { useEffect, useMemo } from 'react';
import {
  fetchingStudentsScheduleSelector,
  getStudentsSchedule,
  resetStoreWhenLeaveStudentList,
  setSelectedMonth,
  studentsScheduleSelector,
} from '@/stores/bus/slice';
import { useSelector } from 'react-redux';
import PageLoader from '@/components/atoms/PageLoader';
import SearchBar from './SearchBar';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants/routes';
import _get from 'lodash/get';
import { TStudentScheduleInList } from '@/utils/types/bus';
import TableScroll from '@/components/molecules/TableScroll';
import { TTableColumns } from '@/utils/types/global';
import { GRADE_DISPLAY } from '@/utils/constants/global';
import Going from '@/components/atoms/TableCellScheduleStatus/Going';
import Returning from '@/components/atoms/TableCellScheduleStatus/Returning';
import ScheduleHistories from '@/components/molecules/ScheduleHistories';

export default function BusScheduleStudents() {
  const dispatch = useAppDispatch();

  const studentsSchedule = useSelector(studentsScheduleSelector);
  const fetching = useSelector(fetchingStudentsScheduleSelector);

  useEffect(() => {
    dispatch(getStudentsSchedule());

    return () => {
      dispatch(resetStoreWhenLeaveStudentList());
    };
  }, [dispatch]);

  const columns: TTableColumns<TStudentScheduleInList> = useMemo(
    () => [
      {
        name: 'name',
        title: '生徒名',
        width: '200px',
        renderer: (record) => (
          <Link
            href={`${ROUTES.BUS_SCHEDULE_BY_STUDENTS}/${record.id}`}
            className="inline-block max-w-full"
            onClick={() => dispatch(setSelectedMonth())}
          >
            <Button variant="link" className="h-[40px]" truncateLink>
              {record.name}
            </Button>
          </Link>
        ),
      },
      {
        name: 'grade',
        title: '学年',
        width: 'auto',
        renderer: (record) => record.grade && _get(GRADE_DISPLAY, record.grade),
      },
      {
        name: 'going',
        title: '登校',
        width: 'auto',
        renderer: (record) => <Going going={record.going} />,
      },
      {
        name: 'returning',
        title: '下校',
        width: 'auto',
        renderer: (record) => (
          <Returning returning={record.returning} returningBusName={record.returningBusName} />
        ),
      },
    ],
    [], // eslint-disable-line
  );

  return (
    <div className="p-6">
      {fetching && <PageLoader />}

      <div className="flex justify-between">
        <h1 className="text-heading30B">申請状況</h1>
        <ScheduleHistories />
      </div>

      <SearchBar />

      <div className="mt-4">
        <TableScroll
          isFilter
          fetching={fetching}
          columns={columns}
          maxHeight="max-h-[calc(100dvh_-_218px)]"
          maxHeightEmpty="max-h-[calc(100dvh_-_267px)]"
          data={studentsSchedule}
        />
      </div>
    </div>
  );
}
