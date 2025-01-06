import TableScroll from '@/components/molecules/TableScroll';
import { useAppDispatch } from '@/stores';
import {
  activeTabIndexSelector,
  driverScheduleSelector,
  fetchingSelector,
  scheduleByTabSelector,
  setActiveTabIndex,
} from '@/stores/driver/slice';
import { GRADE_DISPLAY } from '@/utils/constants/global';
import { TDriverScheduleItem } from '@/utils/types/driver';
import { TTableColumns } from '@/utils/types/global';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';

export default function Tabs() {
  const dispatch = useAppDispatch();

  const schedule = useSelector(driverScheduleSelector);
  const activeTabIndex = useSelector(activeTabIndexSelector);
  const fetching = useSelector(fetchingSelector);
  const scheduleByTab = useSelector(scheduleByTabSelector);

  const handleChangeTab = (index: number) => {
    if (index !== activeTabIndex) dispatch(setActiveTabIndex(index));
  };

  const columns: TTableColumns<TDriverScheduleItem> = useMemo(
    () => [
      {
        name: 'name',
        title: '生徒',
        width: '50%',
        renderer: (record) => <p className="text-body16 font-medium">{record.name}</p>,
      },
      {
        name: 'grade',
        title: '学年',
        width: '50%',
        renderer: (record) => (
          <p className="text-body16 font-medium">{_get(GRADE_DISPLAY, record.grade, '')}</p>
        ),
      },
    ],
    [],
  );

  if (!schedule) return null;

  return (
    <>
      <div className="w-full overflow-x-auto my-4">
        <div className="inline-flex bg-regent-gray-100 p-1 rounded-[8px]">
          {Object.entries(schedule).map(([key, list], index) => (
            <div
              key={key}
              className={clsx(
                'flex items-center justify-center gap-1 rounded-[4px] min-w-[56px] px-2 py-[6px] transition-all',
                index === activeTabIndex ? 'bg-white' : 'cursor-pointer',
              )}
              onClick={() => handleChangeTab(index)}
            >
              <span
                className={clsx(
                  'whitespace-nowrap text-body14 font-medium transition',
                  index !== activeTabIndex && 'text-color-text-muted',
                )}
              >
                {key}
              </span>
              <span className="bg-regent-gray-900 px-1 rounded-full min-w-[20px] text-center font-lato text-body14 text-white">
                {list.length}
              </span>
            </div>
          ))}
        </div>
      </div>

      <TableScroll
        tdClassName="py-4"
        isFilter
        fetching={fetching}
        columns={columns}
        maxHeight="max-h-[calc(100dvh_-_354px)] sm:max-h-[calc(100dvh_-_306px)] md:max-h-[calc(100dvh_-_274px)]"
        maxHeightEmpty="max-h-[calc(100dvh_-_403px)] sm:max-h-[calc(100dvh_-_355px)] md:max-h-[calc(100dvh_-_323px)]"
        data={scheduleByTab}
        emptyMessage={<p className="text-body16B">該当の時間での利用者はいません</p>}
      />
    </>
  );
}
