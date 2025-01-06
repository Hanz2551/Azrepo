import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import Notification from '@/components/templates/Notification';

export default function NotificationPage() {
  return (
    <AuthenticatedLayout title="連絡詳細">
      <Notification />
    </AuthenticatedLayout>
  );
}
