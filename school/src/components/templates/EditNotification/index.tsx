import Breadcrumb from '@/components/molecules/Breadcrumb';
import { ROUTES } from '@/utils/constants/routes';
import { TBodySetting } from '@/utils/types/notification';
import {
  editNotification,
  getNotification,
  notificationDetailSelector,
  resetStore,
} from '@/stores/notification/slice';
import { useAppDispatch } from '@/stores';
import { useRouter } from 'next/router';
import FormNotification from '@/components/organisms/FormNotification';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PageLoader from '@/components/atoms/PageLoader';

const LINKS = [{ href: ROUTES.NOTIFICATIONS, label: '配信メッセージ' }, { label: '編集' }];

export default function EditNotification() {
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

  const handleSubmit = (body: TBodySetting) => {
    dispatch(editNotification({ id, body }))
      .unwrap()
      .then(() => router.push(ROUTES.NOTIFICATIONS));
  };

  if (!notification) return <PageLoader />;

  return (
    <div className="w-[848px] max-w-full mx-auto p-6">
      <Breadcrumb links={LINKS} />

      <h1 className="text-heading30B mt-4 mb-6">配信メッセージ編集</h1>

      {fetching ? (
        <PageLoader />
      ) : !notification ? null : (
        <FormNotification notification={notification} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
