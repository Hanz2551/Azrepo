import { cn } from '@/utils/helpers/tailwind';
import { useMemo } from 'react';

type Props = {
  disabled?: boolean;
  children: string | React.ReactNode;
  className?: string;
  loading?: boolean;
  type?: 'primary' | 'secondary' | 'error';
  variant?: 'contained' | 'outlined' | 'link';
  icon?: React.FC<{ className: string }>;
  trimText?: boolean;
  truncateLink?: boolean;
  onClick?: () => void;
};

export default function Button({
  disabled,
  children,
  className,
  loading,
  type = 'primary',
  variant = 'contained',
  icon: Icon,
  trimText,
  truncateLink,
  onClick,
}: Props) {
  const baseClass = useMemo(
    () =>
      `text-[16px] font-medium flex justify-center items-center min-h-[32px] gap-[2px] rounded-md transition-all focus:outline-none ${!loading ? 'focus:ring-2' : ''} ring-offset-2 ring-sky-blue-700 cursor-pointer disabled:cursor-not-allowed`,
    [loading],
  );

  const colorClass = useMemo(() => {
    if (variant === 'contained') {
      if (disabled) return 'border-regent-gray-100 bg-regent-gray-100 text-regent-gray-400';
      if (type === 'primary')
        return 'border-primary hover:border-sky-blue-600 bg-primary hover:bg-sky-blue-600 text-white';
      if (type === 'error')
        return 'border-error hover:border-energetic-red-700 bg-error hover:bg-energetic-red-700 text-white';
    }

    if (variant === 'outlined') {
      if (disabled) return 'bg-regent-gray-100 text-regent-gray-400';
      if (type === 'secondary') return 'bg-white hover:bg-regent-gray-50';
    }

    if (variant === 'link') {
      if (disabled) return 'text-regent-gray-400';
      return 'text-primary hover:text-sky-blue-600 focus:bg-white';
    }
  }, [type, variant, disabled]);

  return (
    <button
      className={cn(
        baseClass,
        variant !== 'link' ? 'px-[11px] border' : 'underline',
        colorClass,
        loading ? 'opacity-[0.65]' : '',
        truncateLink && 'max-w-full',
        className,
      )}
      disabled={disabled}
      onClick={() => !disabled && !loading && onClick?.()}
    >
      {loading && (
        <svg
          aria-hidden="true"
          className="w-[16px] h-[16px] text-transparent animate-spin fill-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      )}
      {Icon && (
        <Icon
          className={cn(
            '[&>path]:stroke-current',
            variant === 'contained' && 'text-white',
            disabled && 'text-regent-gray-400',
          )}
        />
      )}
      <span
        className={`whitespace-nowrap ${!trimText && variant !== 'link' ? 'px-1' : ''} ${truncateLink ? 'truncate w-full' : ''}`}
      >
        {children}
      </span>
    </button>
  );
}
