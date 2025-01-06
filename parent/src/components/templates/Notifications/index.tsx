import IconChevronLeft from '@/components/atoms/Icon/ChevronLeft';
import PageLoader from '@/components/atoms/PageLoader';
import { useAppDispatch } from '@/stores';
import { getListNotifications, listSelector, resetStore } from '@/stores/notification/slice';
import { ROUTES } from '@/utils/constants/routes';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Truncate from './Truncate';
import { cn } from '@/utils/helpers/tailwind';

export default function Notifications() {
  const dispatch = useAppDispatch();

  const list = useSelector(listSelector);

  useEffect(() => {
    dispatch(getListNotifications());

    return () => {
      dispatch(resetStore());
    };
  }, []); // eslint-disable-line

  if (!list) return <PageLoader />;

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="w-full flex justify-between items-center h-[48px] px-[20px] bg-white">
        <Link href={ROUTES.TOP}>
          <IconChevronLeft width={24} height={24} />
        </Link>
        <p className="font-bold">連絡</p>
        <div className="w-[24px]"></div>
      </div>

      <div className="bg-regent-gray-50 p-4 flex flex-col gap-2 h-[calc(100dvh_-_48px)] overflow-y-auto">
        {list.map((item) => (
          <Link key={item.id} href={`${ROUTES.NOTIFICATIONS}/${item.id}`}>
            <div className="rounded-[8px] bg-white p-4">
              <div className="flex items-start gap-[4px] mb-4">
                {!item.isRead && (
                  <div className="inline-flex px-[4px] py-[8px] min-w-[16px]">
                    <span className="inline-block rounded-full w-[8px] h-[8px] bg-bright-pink-500" />
                  </div>
                )}
                <p
                  className={cn(
                    'line-clamp-2',
                    item.isRead ? 'text-body16 text-color-text-muted' : 'text-body16B',
                  )}
                >
                  {item.title}
                </p>
              </div>
              <Truncate content={item.content} isRead={item.isRead} />
            </div>
          </Link>
        ))}
        {!list?.length && <p className="text-body16B text-center">データがありません</p>}
      </div>
    </div>
  );
}
