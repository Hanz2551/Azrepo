import FullScreenLoader from '@/components/atoms/FullScreenLoader';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import Head from 'next/head';

type Props = {
  children: React.ReactElement;
  title: string;
};

export default function Layout({ children, title }: Props) {
  const { init } = useCheckAuthentication();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      </Head>
      {!init ? (
        <FullScreenLoader />
      ) : (
        <div className="bg-regent-gray-50">
          <div className="min-h-[100dvh] max-w-[540px] mx-auto">{children}</div>
        </div>
      )}
    </>
  );
}
