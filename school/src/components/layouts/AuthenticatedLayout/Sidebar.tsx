import IconUpDown from '@/assets/icons/icon_chevrons_up_down.svg';
import IconLogout from '@/assets/icons/icon_logout.svg';
import { useState } from 'react';
import { useAppDispatch } from '@/stores';
import { currentUserSelector, logout } from '@/stores/auth/slice';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants/routes';
import { clearAuthStorage } from '@/utils/helpers/auth';
import Link from 'next/link';
import IconNotification from '@/assets/icons/icon_notification_sidebar.svg';
import IconUser from '@/assets/icons/icon_user.svg';
import IconBusScheduleStudents from '@/assets/icons/icon_bus_schedule_students_sidebar.svg';
import IconBusScheduleBus from '@/assets/icons/icon_bus_schedule_bus_sidebar.svg';
import { useSelector } from 'react-redux';
import { EUserType } from '@/utils/types/auth';

const TEACHER_MENU_ITEMS = [
  { href: ROUTES.BUS_SCHEDULE_BY_STUDENTS, label: '申請状況', Icon: IconBusScheduleStudents },
  { href: ROUTES.NOTIFICATIONS, label: '配信メッセージ', Icon: IconNotification },
  { href: ROUTES.BUS_SCHEDULE_BY_BUS, label: '乗車名簿', Icon: IconBusScheduleBus },
];

const DRIVER_MENU_ITEMS = [
  { href: ROUTES.BUS_SCHEDULE_BY_BUS, label: '乗車名簿', Icon: IconBusScheduleBus },
];

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const currentUser = useSelector(currentUserSelector);

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);

  const handleLogout = () => {
    setOpen(false);
    dispatch(logout())
      .unwrap()
      .then(() => {
        router.push(ROUTES.LOGIN);
      })
      .catch(() => {
        clearAuthStorage();
        router.push(ROUTES.LOGIN);
      });
  };

  const checkActive = (href: string) => {
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <div
        className={`transition-all w-[56px] min-w-[56px] lg:w-[240px] lg:min-w-[240px] h-[calc(100dvh_-_52px)] bg-white flex flex-col`}
      >
        {currentUser && (
          <>
            <div className="flex-grow p-2 flex flex-col gap-2">
              {(currentUser.userType === EUserType.TEACHER
                ? TEACHER_MENU_ITEMS
                : DRIVER_MENU_ITEMS
              ).map(({ label, href, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center rounded-[4px] h-[40px] transition-all overflow-hidden whitespace-nowrap
                focus:ring-2 focus:bg-white ring-offset-2 ring-sky-blue-700
                px-[12px] gap-[12px] lg:px-[8px] lg:gap-[8px]
                ${checkActive(href) ? `bg-sky-blue-100` : 'hover:bg-sky-blue-100'}`}
                >
                  <Icon className="min-w-[16px]" />
                  <span className="text-body16 whitespace-nowrap">{label}</span>
                </Link>
              ))}
            </div>

            <div className="p-2">
              <div className={`flex items-center transition-all p-0 lg:p-2`}>
                <div
                  className="bg-regent-gray-900 rounded-md p-[12px] pointer-events-auto cursor-pointer lg:cursor-default lg:pointer-events-none select-none"
                  onClick={toggle}
                >
                  <IconUser />
                </div>

                <div className="w-[140px] flex flex-col gap-[2px] ml-2">
                  <p className="font-semibold text-sm leading-[14px] truncate">
                    {currentUser.username}
                  </p>
                  <p className="text-xs leading-[16px] truncate">{currentUser.username}</p>
                </div>

                <div
                  className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer select-none ml-auto"
                  onClick={toggle}
                >
                  <IconUpDown />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {open && (
        <div className="fixed bottom-[8px] min-w-[224px] border rounded bg-white z-[1999] cursor-default left-[50px] lg:left-[235px] shadow-popper">
          <div className="flex items-center p-[12px]">
            <div className="bg-regent-gray-900 rounded-md p-[8px]">
              <IconUser />
            </div>
            <div className="flex flex-col gap-[2px] ml-2">
              <p className="font-semibold text-sm leading-[14px] min-w-[160px] max-w-[240px] truncate">
                {currentUser?.username}
              </p>
              <p className="text-xs leading-[16px] min-w-[160px] min-max-w-[240px] truncate">
                {currentUser?.username}
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-2 h-[40px] px-[12px] border-t cursor-pointer"
            onClick={handleLogout}
          >
            <IconLogout />
            <span className="text-sm">ログアウト</span>
          </div>
        </div>
      )}
    </>
  );
}
