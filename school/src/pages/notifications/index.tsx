import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import Notifications from '@/components/templates/Notifications';

export default function NotificationsPage() {
  return (
    <AuthenticatedLayout title="配信情報確認">
      <Notifications />
    </AuthenticatedLayout>
  );
}
