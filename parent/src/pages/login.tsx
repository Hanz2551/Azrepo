import UnAuthenticatedLayout from '@/components/layouts/UnAuthenticatedLayout';
import Login from '@/components/templates/Login';

export default function LoginPage() {
  return (
    <UnAuthenticatedLayout title="ログイン">
      <Login />
    </UnAuthenticatedLayout>
  );
}
