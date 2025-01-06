import { cn } from '@/utils/helpers/tailwind';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
};

export default function IconPen({ width = 16, height = 16, className = '', onClick }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      className={cn('text-color-icon', className)}
      {...(onClick && { onClick })}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_506_7451)">
        <path
          d="M14.1156 4.54126C14.4681 4.18888 14.6662 3.71091 14.6662 3.2125C14.6663 2.71409 14.4683 2.23607 14.116 1.8836C13.7636 1.53112 13.2856 1.33307 12.7872 1.33301C12.2888 1.33295 11.8108 1.53088 11.4583 1.88326L2.56096 10.7826C2.40618 10.9369 2.29171 11.127 2.22763 11.3359L1.34696 14.2373C1.32973 14.2949 1.32843 14.3562 1.3432 14.4145C1.35796 14.4728 1.38824 14.5261 1.43083 14.5686C1.47341 14.6111 1.52671 14.6413 1.58507 14.656C1.64343 14.6707 1.70467 14.6693 1.7623 14.6519L4.6643 13.7719C4.87308 13.7084 5.06308 13.5947 5.21763 13.4406L14.1156 4.54126Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_506_7451">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
