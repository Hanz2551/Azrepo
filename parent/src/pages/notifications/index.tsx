import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import Notifications from '@/components/templates/Notifications';

export default function NotificationsPage() {
  return (
    <AuthenticatedLayout title="連絡一覧">
      <Notifications />
    </AuthenticatedLayout>
  );
}
