import Button from '@/components/atoms/Button';
import IconHistory from '@/assets/icons/icon_history.svg';
import { useMemo, useState } from 'react';
import busAPI from '@/libs/api/bus';
import { useAppDispatch } from '@/stores';
import { setToast } from '@/stores/global/slice';
import { TEXT } from '@/utils/constants/text';
import Modal from '@/components/molecules/Modal';
import { TScheduleHistory } from '@/utils/types/bus';
import TableScroll from '@/components/molecules/TableScroll';
import { TTableColumns } from '@/utils/types/global';

export default function ScheduleHistories({ studentId }: { studentId?: number }) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TScheduleHistory[] | null>(null);

  const getHistories = async () => {
    try {
      setLoading(true);
      const data = await busAPI.getScheduleHistories(studentId);
      setData(data);
    } catch {
      dispatch(
        setToast({
          status: 'error',
          message: TEXT.errors.somethingError,
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  const columns: TTableColumns<TScheduleHistory> = useMemo(
    () => [
      {
        name: 'editedAt',
        title: '更新日時',
        width: '20%',
        renderer: (record) => <p className="text-one-line16 font-medium">{record.editedAt}</p>,
      },
      {
        name: 'editorType',
        title: '実行者',
        width: '20%',
        renderer: (record) => (
          <div className="flex flex-col gap-2">
            <p className="text-one-line16 font-medium">{record.editorType}</p>
            {record.editorId && (
              <p className="text-one-line14 font-medium text-color-text-muted">
                #{record.editorId}
              </p>
            )}
          </div>
        ),
      },
      {
        name: 'studentName',
        title: '生徒名',
        width: '20%',
        renderer: (record) => <p className="text-one-line16 font-medium">{record.studentName}</p>,
      },
      {
        name: 'previousState',
        title: '変更前',
        width: '20%',
        renderer: (record) => (
          <p className="text-one-line16 font-medium">
            {record.date}
            <br />
            {record.previousState}
          </p>
        ),
      },
      {
        name: 'newState',
        title: '変更後',
        width: '20%',
        renderer: (record) => (
          <p className="text-one-line16 font-medium">
            {record.date}
            <br />
            {record.newState}
          </p>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Button
        variant="outlined"
        type="secondary"
        icon={IconHistory}
        loading={loading}
        className="px-2 gap-0 text-[14px]"
        onClick={getHistories}
      >
        更新履歴
      </Button>

      {data !== null && (
        <Modal
          title="更新履歴"
          widthClass="w-[800px] max-w-[calc(100dvw_-_32px)]"
          onClose={() => setData(null)}
        >
          <TableScroll
            scrollerClass="scroller-base"
            fetching={loading}
            tdClassName="py-[12px]"
            minWidth="min-w-[700px]"
            maxHeight="max-h-[333px]"
            maxHeightEmpty="h-[284px]"
            customCellPadding={[null, null, null, 'pr-0', 'pr-0']}
            columns={columns}
            data={data}
          />
        </Modal>
      )}
    </>
  );
}
