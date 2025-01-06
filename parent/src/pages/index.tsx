import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import Top from '@/components/templates/Top';

export default function TopPage() {
  return (
    <AuthenticatedLayout title="トップ">
      <Top />
    </AuthenticatedLayout>
  );
}
