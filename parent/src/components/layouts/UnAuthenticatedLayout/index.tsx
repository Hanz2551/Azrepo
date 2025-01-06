import { clearAuthStorage } from '@/utils/helpers/auth';
import Head from 'next/head';
import { useEffect } from 'react';

type Props = {
  children: React.ReactElement;
  title: string;
};

export default function Layout({ children, title }: Props) {
  useEffect(() => {
    clearAuthStorage();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      </Head>
      <div className="bg-regent-gray-50">
        <div className="max-w-[540px] mx-auto">{children}</div>
      </div>
    </>
  );
}
