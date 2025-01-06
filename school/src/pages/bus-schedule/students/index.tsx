import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import BusScheduleStudents from '@/components/templates/BusSchedule/ByStudents';

export default function BusScheduleStudentsPage() {
  return (
    <AuthenticatedLayout title="申請状況">
      <BusScheduleStudents />
    </AuthenticatedLayout>
  );
}
