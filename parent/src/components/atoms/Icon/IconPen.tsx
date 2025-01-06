import { cn } from '@/utils/helpers/tailwind';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
};

export default function IconPen({ width = 24, height = 24, className = '', onClick }: Props) {
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
        d="M21.174 7.31189C21.7027 6.78332 21.9998 6.06636 21.9999 5.31875C22 4.57113 21.7031 3.8541 21.1745 3.32539C20.6459 2.79668 19.929 2.49961 19.1813 2.49951C18.4337 2.49942 17.7167 2.79632 17.188 3.32489L3.842 16.6739C3.60981 16.9054 3.43811 17.1904 3.342 17.5039L2.021 21.8559C1.99515 21.9424 1.9932 22.0342 2.01535 22.1217C2.03749 22.2092 2.08292 22.2891 2.14679 22.3529C2.21067 22.4167 2.29062 22.462 2.37815 22.484C2.46569 22.506 2.55755 22.5039 2.644 22.4779L6.997 21.1579C7.31017 21.0626 7.59517 20.892 7.827 20.6609L21.174 7.31189Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
