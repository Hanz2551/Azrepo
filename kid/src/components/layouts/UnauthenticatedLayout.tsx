import { useAppDispatch } from '@/stores';
import { resetStore } from '@/stores/auth/slice';
import Head from 'next/head';
import { useEffect } from 'react';

export default function UnauthenticatedLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetStore());
  }, []); // eslint-disable-line

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
}
