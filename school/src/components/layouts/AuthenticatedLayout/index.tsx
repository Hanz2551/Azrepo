import FullScreenLoader from '@/components/atoms/FullScreenLoader';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import Head from 'next/head';
import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
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
        <div className="flex flex-col">
          <div className="bg-sky-blue-600 h-[52px] border-b border-color-border text-body14 px-4 pt-[15px] pb-[16px] text-white tracking-[0.64px]">
            スマモビ
          </div>
          <div className="flex">
            <Sidebar />
            <div className="w-auto flex-grow h-[calc(100dvh_-_52px)] scroller-y-base transition-width bg-regent-gray-50 border-l border-border-border">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
