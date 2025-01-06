import PageLoader from '@/components/atoms/PageLoader';
import Button from '@/components/atoms/Button';
import { ROUTES } from '@/utils/constants/routes';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import { useRouter } from 'next/router';
import _get from 'lodash/get';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@/stores';
import {
  fetchingStudentScheduleSelector,
  getStudentSchedule,
  resetStore,
  studentScheduleSelector,
} from '@/stores/bus/slice';
import { useSelector } from 'react-redux';
import TableScroll from '@/components/molecules/TableScroll';
import { TTableColumns } from '@/utils/types/global';
import { TStudentScheduleInDetail } from '@/utils/types/bus';
import Going from '@/components/atoms/TableCellScheduleStatus/Going';
import Returning from '@/components/atoms/TableCellScheduleStatus/Returning';
import { format, isSaturday, isSunday } from 'date-fns';
import { getDayOfWeekJa } from '@/utils/helpers/dateTime';
import IconPen from '@/components/atoms/Icon/IconPen';
import ModalEdit from './ModalEdit';
import ScheduleHistories from '@/components/molecules/ScheduleHistories';

export default function StudentDetail() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const studentId = Number(_get(router.query, 'student_id'));

  const studentSchedule = useSelector(studentScheduleSelector);

  const fetching = useSelector(fetchingStudentScheduleSelector);

  const [dateSelected, setDateSelected] = useState<TStudentScheduleInDetail | null>(null);

  useEffect(() => {
    if (!Number.isNaN(studentId)) {
      dispatch(getStudentSchedule(studentId));
    }

    return () => {
      dispatch(resetStore());
    };
  }, [dispatch, studentId]);

  const columns: TTableColumns<TStudentScheduleInDetail> = useMemo(
    () => [
      {
        name: 'date',
        title: '日付',
        width: '200px',
        renderer: (record) => {
          const color = isSaturday(record.date)
            ? 'text-primary'
            : isSunday(record.date)
              ? 'text-error'
              : '';
          return (
            <p className="py-2">
              <span
                className={`font-lato text-one-line16 font-medium min-w-[25px] inline-block ${color}`}
              >
                {format(record.date, 'dd')}
              </span>
              <span className={`text-one-line16 font-medium ${color}`}>
                ({getDayOfWeekJa(record.date)})
              </span>
            </p>
          );
        },
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
      {
        name: 'action',
        title: '',
        width: '64px',
        renderer: (record) => (
          <Button
            type="secondary"
            variant="outlined"
            className="px-[3px]"
            onClick={() => setDateSelected(record)}
          >
            <IconPen />
          </Button>
        ),
      },
    ],
    [],
  );

  const breadcrumbLinks = useMemo(
    () => [
      { href: ROUTES.BUS_SCHEDULE_BY_STUDENTS, label: '申請状況' },
      { label: studentSchedule?.name || '' },
    ],
    [studentSchedule],
  );

  return (
    <div className="p-6">
      <Breadcrumb links={breadcrumbLinks} />

      {fetching && <PageLoader />}

      {!!studentSchedule && (
        <>
          <div className="flex justify-between mt-4 mb-6">
            <h1 className="text-heading30B truncate">{studentSchedule.name}の申請状況</h1>
            <ScheduleHistories studentId={studentId} />
          </div>

          <div className="mt-6">
            <TableScroll
              fetching={fetching}
              columns={columns}
              maxHeight="max-h-[calc(100dvh_-_198px)]"
              maxHeightEmpty="max-h-[calc(100dvh_-_247px)]"
              data={studentSchedule.schedule}
              keyName="date"
            />
          </div>
        </>
      )}

      {dateSelected && (
        <ModalEdit
          studentId={studentId}
          schedule={dateSelected}
          month={studentSchedule!.month}
          onClose={() => setDateSelected(null)}
        />
      )}
    </div>
  );
}
