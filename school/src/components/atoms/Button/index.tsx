import { cn } from '@/utils/helpers/tailwind';
import { useMemo } from 'react';
import IconSpin from '../Icon/IconSpin';

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
        <IconSpin fillColorClass={variant === 'contained' ? 'fill-white' : 'fill-color-icon'} />
      )}
      {Icon && !loading && (
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
