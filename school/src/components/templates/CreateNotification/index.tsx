import Breadcrumb from '@/components/molecules/Breadcrumb';
import { ROUTES } from '@/utils/constants/routes';
import { TBodySetting } from '@/utils/types/notification';
import { createNotification } from '@/stores/notification/slice';
import { useAppDispatch } from '@/stores';
import { useRouter } from 'next/router';
import FormNotification from '@/components/organisms/FormNotification';

const LINKS = [{ href: ROUTES.NOTIFICATIONS, label: '配信メッセージ' }, { label: '作成' }];

export default function CreateNotification() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = (body: TBodySetting) => {
    dispatch(createNotification(body))
      .unwrap()
      .then(() => router.push(ROUTES.NOTIFICATIONS));
  };

  return (
    <div className="w-[848px] max-w-full mx-auto p-6">
      <Breadcrumb links={LINKS} />

      <h1 className="text-heading30B mt-4 mb-6">配信メッセージ作成</h1>

      <FormNotification onSubmit={handleSubmit} />
    </div>
  );
}
