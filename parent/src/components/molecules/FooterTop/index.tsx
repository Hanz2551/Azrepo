import { ROUTES } from '@/utils/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import IconBus from '@/components/atoms/Icon/IconBus';
import IconHouse from '@/components/atoms/Icon/IconHouse';

const LINKS = [
  { href: ROUTES.TOP, icon: IconHouse, label: 'ホーム' },
  { href: ROUTES.BUS_REGISTRATION, icon: IconBus, label: '利用申請' },
];

export default function FooterTop() {
  const router = useRouter();

  return (
    <div className="bg-white w-full h-[68px] flex">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex flex-col justify-center items-center gap-[8px] p-[8px] w-[50%] ${router.pathname === link.href ? 'text-primary font-medium' : 'text-color-text-muted'}`}
        >
          <link.icon
            className={router.pathname === link.href ? 'text-primary' : 'text-color-text-muted'}
          />
          <span className="leading-[16px]">{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
