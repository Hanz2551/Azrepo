import Button from '@/components/atoms/Button';
import IconPlus from '@/assets/icons/icon_plus.svg';
import { ROUTES } from '@/utils/constants/routes';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@/stores';
import {
  deleteNotification,
  getNotifications,
  notificationsSelector,
  resetStore,
} from '@/stores/notification/slice';
import { useSelector } from 'react-redux';
import PageLoader from '@/components/atoms/PageLoader';
import { TTableColumns } from '@/utils/types/global';
import TableScroll from '@/components/molecules/TableScroll';
import { TNotificationInList } from '@/utils/types/notification';
import IconPen from '@/components/atoms/Icon/IconPen';
import IconTrash from '@/components/atoms/Icon/IconTrash';
import NotificationSendStatus from '@/components/atoms/NotificationSendStatus';
import ModalConfirmDelete from '@/components/molecules/ModalConfirmDelete';
import NotificationGradeTags from '@/components/atoms/NotificationGradeTags';
import IconPaperClip from '@/assets/icons/icon_paperclip.svg';

export default function Notifications() {
  const dispatch = useAppDispatch();

  const notifications = useSelector(notificationsSelector);

  const [deleting, setDeleting] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [modalDeleteData, setModalDeleteData] = useState<TNotificationInList | null>(null);

  useEffect(() => {
    dispatch(getNotifications())
      .unwrap()
      .finally(() => setFetching(false));

    return () => {
      dispatch(resetStore());
    };
  }, []); // eslint-disable-line

  const columns: TTableColumns<TNotificationInList> = useMemo(
    () => [
      {
        name: 'send_status',
        title: '配信状況',
        width: '128px',
        renderer: (record) => <NotificationSendStatus status={record.sendStatus} />,
      },
      {
        name: 'title',
        title: '件名',
        width: 'auto',
        renderer: (record) => (
          <Link href={`${ROUTES.NOTIFICATIONS}/${record.id}`} className="inline-block max-w-full">
            <Button variant="link" className="h-[40px]" truncateLink>
              {record.title}
            </Button>
          </Link>
        ),
      },
      {
        name: 'to',
        title: '送付先',
        width: 'auto',
        renderer: (record) => <NotificationGradeTags value={record.to} />,
      },
      {
        name: 'time',
        title: '表示期間',
        width: 'auto',
        renderer: (record) => (
          <span className="text-[14px] font-lato font-medium">
            {record.startAt}-{record.endAt}
          </span>
        ),
      },
      {
        name: 'file',
        title: '添付ファイル',
        width: '128px',
        renderer: (record) =>
          record.notificationFilesExists ? (
            <button className="p-2 cursor-default">
              <IconPaperClip />
            </button>
          ) : null,
      },
      {
        name: 'action',
        title: '',
        width: '104px',
        renderer: (record) => (
          <div className="flex gap-2">
            {record.sendStatus === 'end' ? (
              <div className="w-[32px]" />
            ) : (
              <Link href={`${ROUTES.NOTIFICATIONS}/${record.id}/edit`}>
                <Button type="secondary" variant="outlined" className="px-[3px]">
                  <IconPen />
                </Button>
              </Link>
            )}
            <Button
              type="secondary"
              variant="outlined"
              className="px-[3px]"
              onClick={() => setModalDeleteData(record)}
            >
              <IconTrash className="text-icon" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const handleDeleteNotification = () => {
    if (!modalDeleteData) return;
    setDeleting(true);
    dispatch(deleteNotification(modalDeleteData.id))
      .unwrap()
      .then(() => {
        setModalDeleteData(null);
      })
      .finally(() => setDeleting(false));
  };

  return (
    <div className="p-6">
      {fetching && <PageLoader />}

      <div className="flex justify-between">
        <h1 className="text-heading30B">配信メッセージ</h1>

        <Link href={`${ROUTES.NOTIFICATIONS}/create`}>
          <Button icon={IconPlus} className="gap-0 h-[32px] px-[7px] text-[14px]">
            新規作成
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        <TableScroll
          fetching={fetching}
          columns={columns}
          maxHeight="max-h-[calc(100dvh_-_162px)]"
          maxHeightEmpty="max-h-[calc(100dvh_-_211px)]"
          data={notifications}
        />
      </div>

      {modalDeleteData && (
        <ModalConfirmDelete
          onClose={() => setModalDeleteData(null)}
          onOk={handleDeleteNotification}
          loading={deleting}
          title="配信メッセージの削除"
          subTitle="以下のメッセージを削除しますか？"
        >
          <p className="text-body16 text-color-text-muted mb-1">削除するメッセージ</p>
          <p className="text-body16 font-semibold">{modalDeleteData.title}</p>
        </ModalConfirmDelete>
      )}
    </div>
  );
}
