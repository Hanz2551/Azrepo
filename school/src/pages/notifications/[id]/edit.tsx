import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import EditNotification from '@/components/templates/EditNotification';

export default function EditNotificationPage() {
  return (
    <AuthenticatedLayout title="配信情報-編集">
      <EditNotification />
    </AuthenticatedLayout>
  );
}
