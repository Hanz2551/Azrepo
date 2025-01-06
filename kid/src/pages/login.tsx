import UnauthenticatedLayout from '@/components/layouts/UnauthenticatedLayout';
import Login from '@/components/templates/Login';

export default function LoginPage() {
  return (
    <UnauthenticatedLayout title="なみえ創成小中学校">
      <Login />
    </UnauthenticatedLayout>
  );
}
