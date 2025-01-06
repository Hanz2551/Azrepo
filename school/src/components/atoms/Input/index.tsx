import { cn } from '@/utils/helpers/tailwind';
import { ClassValue } from 'clsx';
import { forwardRef } from 'react';
import IconError from '@/assets/icons/icon_error_input.svg';

type Props = {
  ref?: React.RefObject<HTMLInputElement>;
  name: string;
  type?: 'text' | 'password';
  label?: string;
  className?: ClassValue;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (params: { name: string; value: string }) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { type, label, className, name, disabled, error, onChange, ...props }: Props,
  ref,
) {
  return (
    <div className="flex flex-col gap-[8px]">
      {label && (
        <label className={`text-body16 font-medium ${error ? 'text-error' : ''}`}>{label}</label>
      )}
      <input
        {...(ref && { ref })}
        className={cn(
          'border rounded-[8px] text-body16 transition-shadow focus:outline-none focus:ring-2 ring-offset-2 ring-sky-blue-700 caret-primary placeholder:text-regent-gray-600 placeholder:font-normal',
          error && 'border-error border-2',
          !error ? 'p-[7px]' : 'p-[6px]',
          disabled
            ? 'bg-regent-gray-100 text-regent-gray-400 cursor-not-allowed placeholder:opacity-0'
            : 'font-medium',
          className,
        )}
        type={type || 'text'}
        name={name}
        disabled={disabled}
        onChange={(e) => onChange?.({ name, value: e.target.value })}
        {...props}
      />
      {error && (
        <p className="text-error flex gap-1 items-center">
          <IconError />
          <span className="text-body14 font-medium">{error}</span>
        </p>
      )}
    </div>
  );
});

export default Input;
