import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import CreateNotification from '@/components/templates/CreateNotification';

export default function CreateNotificationPage() {
  return (
    <AuthenticatedLayout title="配信情報-作成">
      <CreateNotification />
    </AuthenticatedLayout>
  );
}
