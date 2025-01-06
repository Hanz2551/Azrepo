import { cn } from '@/utils/helpers/tailwind';

type Props = {
  label?: string;
  id: string;
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function Checkbox({
  label,
  id,
  className,
  fullWidth,
  children,
  checked,
  onChange,
}: Props) {
  return (
    <div className={cn('inline-flex items-center', fullWidth && 'flex w-full', className)}>
      <label className="flex items-center cursor-pointer relative" htmlFor={id}>
        <input
          type="checkbox"
          checked={checked}
          className="peer h-[16px] w-[16px] cursor-pointer transition-all appearance-none rounded-[4px] border checked:bg-primary checked:border-primary"
          id={id}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      {children}
      {label && (
        <label className="cursor-pointer pl-2 text-body14" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}
