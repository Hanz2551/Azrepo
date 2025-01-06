import Link from 'next/link';
import IconChevronRight from '@/assets/icons/icon_chevron_right.svg';
import { Fragment } from 'react';

type Props = {
  links: {
    href?: string;
    label: string;
  }[];
};

export default function Breadcrumb({ links }: Props) {
  return (
    <div className="flex items-center gap-2">
      {links.map((link, index) =>
        link.href ? (
          <Fragment key={index}>
            <Link href={link.href} className="text-sm text-regent-gray-600">
              {link.label}
            </Link>
            <IconChevronRight className="text-[#64748b]" />
          </Fragment>
        ) : (
          <span key={index} className="text-sm">
            {link.label}
          </span>
        ),
      )}
    </div>
  );
}
