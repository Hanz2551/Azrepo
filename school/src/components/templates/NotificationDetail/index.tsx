import React, { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button';
import PageLoader from '@/components/atoms/PageLoader';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import { useAppDispatch } from '@/stores';
import {
  getNotification,
  notificationDetailSelector,
  resetStore,
} from '@/stores/notification/slice';
import { ROUTES } from '@/utils/constants/routes';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Detail from './Detail';
import IconPen from '@/components/atoms/Icon/IconPen';
import Link from 'next/link';
import { getSendStatus } from '@/utils/helpers/notification';

const LINKS = [{ href: ROUTES.NOTIFICATIONS, label: '配信メッセージ' }, { label: '詳細' }];

export default function NotificationDetail() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = Number(router.query.id);

  const notification = useSelector(notificationDetailSelector);

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!Number.isNaN(id))
      dispatch(getNotification(id))
        .unwrap()
        .finally(() => setFetching(false));

    return () => {
      dispatch(resetStore());
    };
  }, [id]); // eslint-disable-line

  return (
    <div className="w-[848px] max-w-full mx-auto p-6">
      <Breadcrumb links={LINKS} />

      <div className="flex justify-between mt-4 mb-6">
        <h1 className="text-heading30B">配信メッセージ詳細</h1>

        {notification && getSendStatus(notification.startAt, notification.endAt) !== 'end' && (
          <Link href={`${ROUTES.NOTIFICATIONS}/${id}/edit`}>
            <Button className="h-[36px] px-[7px] gap-0 text-[14px]" icon={IconPen}>
              編集
            </Button>
          </Link>
        )}
      </div>

      {fetching ? <PageLoader /> : !notification ? null : <Detail notification={notification} />}
    </div>
  );
}
