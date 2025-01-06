import { useAppDispatch } from '@/stores';
import { useEffect, useMemo } from 'react';
import { getTopData, resetStore, topDataSelector } from '@/stores/top/slice';
import IconBell from '@/assets/icons/icon_bell.svg';
import FooterTop from '@/components/molecules/FooterTop';
import IconToSchool from '@/assets/icons/icon_to_school.svg';
import IconLeaveSchool from '@/assets/icons/icon_leave_school.svg';
import { ROUTES } from '@/utils/constants/routes';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import PageLoader from '@/components/atoms/PageLoader';
import { formatTimeJP, getDayOfWeekInJapanese } from '@/utils/helpers/dateTime';
import IconWrench from '@/assets/icons/icon_wrench.svg';
import { addMonths } from 'date-fns';

const valueIsTime = (value: string) => {
  return value !== '利用しない' && value !== '未記入';
};

export default function Top() {
  const dispatch = useAppDispatch();

  const topData = useSelector(topDataSelector);

  const existNotification = useMemo(() => {
    if (!topData) return false;
    return (
      !topData.scheduledCurrentMonth ||
      !topData.scheduledNextMonth ||
      topData.notifications.length > 0
    );
  }, [topData]);

  useEffect(() => {
    dispatch(getTopData());

    return () => {
      dispatch(resetStore());
    };
  }, []); // eslint-disable-line

  if (!topData) return <PageLoader />;

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="w-full flex justify-between items-center h-[48px] px-[20px] bg-white">
        <div className="w-[24px]" />
        <p className="text-body16B">
          <span className="font-lato">{formatTimeJP(new Date(), 'MM/dd')}</span>(
          {getDayOfWeekInJapanese(new Date())})
        </p>
        <div>
          <Link href={ROUTES.NOTIFICATIONS} className="relative inline-block">
            <IconBell />
            {topData.existsUnreadNotification && (
              <span className="absolute -top-[3px] -right-[3px] rounded-full min-w-[9px] w-[9px] h-[9px] bg-bright-pink-500" />
            )}
          </Link>
        </div>
      </div>

      <div className="bg-regent-gray-50 p-4 flex flex-col gap-6 h-[calc(100dvh_-_116px)] overflow-y-auto">
        <div className="flex flex-col gap-4">
          <h3 className="text-heading20B">今日の予定</h3>

          {topData.students?.map((student) => (
            <div key={student.id} className="flex flex-col gap-4 p-4 bg-white rounded-[8px]">
              <p className="text-heading16B">{student.name}</p>
              <div className="flex">
                <div className="w-[50%] flex items-start gap-2">
                  <span className="p-2 rounded-[8px] bg-bright-pink-50">
                    <IconToSchool />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-body14 font-medium text-color-text-muted">登校</span>
                    <span
                      className={
                        valueIsTime(student.going)
                          ? 'font-lato text-one-line20B'
                          : 'text-one-line16B mt-[2px]'
                      }
                    >
                      {student.going}
                    </span>
                  </div>
                </div>
                <div className="w-[50%] flex items-start gap-2">
                  <span className="p-2 rounded-[8px] bg-sky-blue-50">
                    <IconLeaveSchool />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-body14 font-medium text-color-text-muted">下校</span>
                    <span
                      className={
                        valueIsTime(student.returning)
                          ? 'font-lato text-one-line20B'
                          : 'text-one-line16B mt-[2px]'
                      }
                    >
                      {student.returning}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-heading20B">連絡</h3>

          {!existNotification ? (
            <div className="bg-white p-4 rounded-[8px]">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-regent-gray-100 w-[40px] h-[40px] p-2">
                  <IconBell className="[&>path]:stroke-color-icon" />
                </div>
                <p className="text-[16px] font-bold">連絡はありません</p>
              </div>
            </div>
          ) : (
            <div className="bg-bright-pink-50 p-4 rounded-[8px]">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-bright-pink-500 w-[40px] h-[40px] p-2">
                  <IconBell className="[&>path]:stroke-white" />
                </div>
                <p className="text-[16px] font-semibold">
                  連絡が
                  <span className="font-lato">
                    {topData.notifications.length +
                      (!topData.scheduledCurrentMonth ? 1 : 0) +
                      (!topData.scheduledNextMonth ? 1 : 0)}
                  </span>
                  件あります
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {!topData.scheduledCurrentMonth && (
                  <p className="rounded-[4px] bg-white p-2 text-body14 font-medium truncate">
                    {formatTimeJP(new Date(), 'MM')}月の利用申請が登録されていません
                  </p>
                )}
                {!topData.scheduledNextMonth && (
                  <p className="rounded-[4px] bg-white p-2 text-body14 font-medium truncate">
                    {formatTimeJP(addMonths(new Date(), 1), 'MM')}
                    月の利用申請が登録されていません
                  </p>
                )}

                {topData.notifications.map((item) => (
                  <Link
                    key={item.id}
                    href={`${ROUTES.NOTIFICATIONS}/${item.id}`}
                    className="rounded-[4px] bg-white p-2 text-body14 font-medium truncate"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-heading20B">運行状況（開発中）</h3>

          <div className="bg-regent-gray-100 p-4 rounded-[8px] flex items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="leading-[20px] font-bold">機能開発中</p>
              <p className="text-body14 text-color-text-muted">
                運行状況を確認できる機能を開発中です
              </p>
            </div>
            <IconWrench />
          </div>
        </div>

        {/* <div className="flex flex-col gap-4">
          <p className="text-[16px] font-semibold text-black">運行状況</p>
          <div className="bg-leaf-green-100 p-4 rounded flex flex-col gap-1 bg-[url('/icons/icon_speaker.svg')] bg-no-repeat bg-[bottom_right_37px]">
            <p className="text-[24px] font-semibold text-leaf-green-700">通常運行</p>
            <p className="text-[12px] text-regent-gray-900">運行状況を確認できる機能を開発中です</p>
          </div>
        </div> */}
      </div>

      <FooterTop />
    </div>
  );
}
