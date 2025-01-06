import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import NotificationDetail from '@/components/templates/NotificationDetail';

export default function NotificationPage() {
  return (
    <AuthenticatedLayout title="配信情報-編集">
      <NotificationDetail />
    </AuthenticatedLayout>
  );
}
