import NotificationGradeTags from '@/components/atoms/NotificationGradeTags';
import NotificationSendStatus from '@/components/atoms/NotificationSendStatus';
import { getSendStatus } from '@/utils/helpers/notification';
import { TNotificationDetail } from '@/utils/types/notification';

type Props = {
  notification: TNotificationDetail;
};

export default function Detail({ notification }: Props) {
  return (
    <div className="bg-white p-6 border rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-heading20B break-all">{notification.title}</h3>

        <NotificationSendStatus status={getSendStatus(notification.startAt, notification.endAt)} />
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col items-start gap-1 w-[calc(50%_-_4px)]">
          <label className="font-medium text-body16 text-color-text-muted">送付先</label>
          <NotificationGradeTags value={notification.to} />
        </div>

        <div className="flex flex-col gap-1 w-[calc(50%_-_4px)]">
          <label className="font-medium text-body16 text-color-text-muted">表示期間</label>
          <p className="text-body16 font-medium font-lato">
            {notification.startAt}-{notification.endAt}
          </p>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-1">
        <div
          className="text-body14 [&_p]:text-body16 [&_p]:whitespace-break-spaces [&_p]:break-all [&_p]:mb-[24px] [&_p:last-child]:mb-0 [&_a]:text-primary [&_a]:font-medium [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: notification.content }}
        />
      </div>

      <hr />

      <div className="flex flex-col gap-2">
        <label className="font-medium text-body16 text-color-text-muted">添付ファイル</label>
        {!notification.notificationFiles?.length ? (
          <p className="text-body16 font-medium">無し</p>
        ) : (
          <div className="flex flex-col gap-2">
            {notification.notificationFiles.map((file) => (
              <p
                key={file.id}
                className="text-body16 font-medium p-2 bg-regent-gray-50 rounded-[8px] break-all"
              >
                {file.fileName}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
