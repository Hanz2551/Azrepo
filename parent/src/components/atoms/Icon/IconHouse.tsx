import { cn } from '@/utils/helpers/tailwind';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
};

export default function IconHouse({ width = 24, height = 24, className = '', onClick }: Props) {
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
        d="M15.5 21V13C15.5 12.7348 15.3946 12.4804 15.2071 12.2929C15.0196 12.1053 14.7652 12 14.5 12H10.5C10.2348 12 9.98043 12.1053 9.79289 12.2929C9.60536 12.4804 9.5 12.7348 9.5 13V21M3.5 9.99997C3.49993 9.70904 3.56333 9.42159 3.68579 9.15768C3.80824 8.89378 3.9868 8.65976 4.209 8.47197L11.209 2.47297C11.57 2.16788 12.0274 2.00049 12.5 2.00049C12.9726 2.00049 13.43 2.16788 13.791 2.47297L20.791 8.47197C21.0132 8.65976 21.1918 8.89378 21.3142 9.15768C21.4367 9.42159 21.5001 9.70904 21.5 9.99997V19C21.5 19.5304 21.2893 20.0391 20.9142 20.4142C20.5391 20.7893 20.0304 21 19.5 21H5.5C4.96957 21 4.46086 20.7893 4.08579 20.4142C3.71071 20.0391 3.5 19.5304 3.5 19V9.99997Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
