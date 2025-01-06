import { useAppDispatch } from '@/stores';
import { resetStore } from '@/stores/auth/slice';
import { clearAuthStorage } from '@/utils/helpers/auth';
import Head from 'next/head';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function Layout({ children, title }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    clearAuthStorage();
    dispatch(resetStore());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      </Head>
      <div className="h-[100dvh] scroller-y-base bg-regent-gray-50">{children}</div>
    </>
  );
}
