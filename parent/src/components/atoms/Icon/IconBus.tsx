import { cn } from '@/utils/helpers/tailwind';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
};

export default function IconBus({ width = 24, height = 24, className = '', onClick }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('text-color-icon', className)}
      {...(onClick && { onClick })}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 6V12M15.5 6V12M2.5 12H22.1M18.5 18H21.5C21.5 18 22 16.3 22.3 15.2C22.4 14.8 22.5 14.4 22.5 14C22.5 13.6 22.4 13.2 22.3 12.8L20.9 7.8C20.6 6.8 19.6 6 18.5 6H4.5C3.96957 6 3.46086 6.21071 3.08579 6.58579C2.71071 6.96086 2.5 7.46957 2.5 8V18H5.5M18.5 18C18.5 19.1046 17.6046 20 16.5 20C15.3954 20 14.5 19.1046 14.5 18M18.5 18C18.5 16.8954 17.6046 16 16.5 16C15.3954 16 14.5 16.8954 14.5 18M5.5 18C5.5 19.1046 6.39543 20 7.5 20C8.60457 20 9.5 19.1046 9.5 18M5.5 18C5.5 16.8954 6.39543 16 7.5 16C8.60457 16 9.5 16.8954 9.5 18M9.5 18H14.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
