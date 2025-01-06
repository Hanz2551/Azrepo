import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import BusScheduleBus from '@/components/templates/BusSchedule/ByBus';

export default function BusScheduleBusPage() {
  return (
    <AuthenticatedLayout title="利用申請（バス）">
      <BusScheduleBus />
    </AuthenticatedLayout>
  );
}
