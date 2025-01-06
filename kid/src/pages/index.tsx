import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import Top from '@/components/templates/Top';

export default function TopPage() {
  return (
    <AuthenticatedLayout title="QR読み取り">
      <Top />
    </AuthenticatedLayout>
  );
}
