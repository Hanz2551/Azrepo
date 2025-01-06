import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import BusRegistration from '@/components/templates/BusRegistration';

export default function BusRegistrationPage() {
  return (
    <AuthenticatedLayout title="バス利用申請">
      <BusRegistration />
    </AuthenticatedLayout>
  );
}
