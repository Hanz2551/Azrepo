import { currentUserSelector } from '@/stores/auth/slice';
import { ROUTES } from '@/utils/constants/routes';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AuthenticatedLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const currentUser = useSelector(currentUserSelector);

  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.push(ROUTES.LOGIN);
    } else if (new Date().getTime() > currentUser.expiresAt) {
      router.push(ROUTES.LOGIN);
    } else setInit(true);
  }, [currentUser, router]);

  if (!init) return null;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="bg-sky-blue-50">
        <div className="max-w-[1194px] mx-auto">{children}</div>
      </div>
    </>
  );
}
