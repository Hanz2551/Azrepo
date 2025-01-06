import { cn } from '@/utils/helpers/tailwind';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
};

export default function IconX({ width = 16, height = 16, className = '', onClick }: Props) {
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
      <path
        d="M12.5 4L4.5 12M4.5 4L12.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
