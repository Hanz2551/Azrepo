import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import StudentDetail from '@/components/templates/BusSchedule/StudentDetail';

export default function StudentDetailPage() {
  return (
    <AuthenticatedLayout title="利用申請-詳細">
      <StudentDetail />
    </AuthenticatedLayout>
  );
}
