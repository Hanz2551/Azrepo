import PageLoader from '@/components/atoms/PageLoader';
import { detailSelector, getNotification, resetStore } from '@/stores/notification/slice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/stores';
import { useRouter } from 'next/router';
import IconChevronLeft from '@/components/atoms/Icon/ChevronLeft';
import { ROUTES } from '@/utils/constants/routes';

export default function Notification() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = Number(router.query.notification_id);

  const notification = useSelector(detailSelector);

  useEffect(() => {
    if (id && !Number.isNaN(id)) {
      dispatch(getNotification(id))
        .unwrap()
        .catch(() => router.push(ROUTES.NOTIFICATIONS));
    }

    return () => {
      dispatch(resetStore());
    };
  }, [id]); // eslint-disable-line

  if (!notification) return <PageLoader />;

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="w-full flex justify-between items-center h-[48px] p-4 bg-white">
        <IconChevronLeft
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="font-bold">連絡</p>
        <div className="w-[24px]"></div>
      </div>

      <div className="bg-white p-4 h-[calc(100dvh_-_48px)] overflow-y-auto">
        <h2 className="text-heading20B">{notification.title}</h2>

        <div
          className="mt-4 [&_p]:text-body16 [&_p]:whitespace-break-spaces [&_p]:break-all [&_p]:mb-[24px] [&_p:last-child]:mb-0 [&_a]:text-primary [&_a]:underline [&_a]:font-medium"
          dangerouslySetInnerHTML={{ __html: notification.content }}
        />

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium text-body16 text-color-text-muted">添付ファイル</label>
          {!notification.notificationFiles?.length ? (
            <p className="text-body16 font-medium">無し</p>
          ) : (
            <div className="flex flex-col gap-2">
              {notification.notificationFiles.map((file) => (
                <a
                  key={file.id}
                  className="block text-body16 font-medium p-2 bg-regent-gray-50 rounded-[8px] break-all"
                  target="_blank"
                  href={file.fileUrl}
                  rel="noreferrer"
                >
                  {file.fileName}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
