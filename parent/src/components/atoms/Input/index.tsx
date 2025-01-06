import { cn } from '@/utils/helpers/tailwind';
import { ClassValue } from 'clsx';
import { forwardRef } from 'react';

type Props = {
  ref?: React.RefObject<HTMLInputElement>;
  name: string;
  type?: 'text' | 'password';
  label?: string;
  className?: ClassValue;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (params: { name: string; value: string }) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { type, label, className, name, disabled, onChange, ...props }: Props,
  ref,
) {
  return (
    <div className="flex flex-col gap-[8px]">
      {label && <label className={`text-body16 font-medium`}>{label}</label>}
      <input
        {...(ref && { ref })}
        className={cn(
          'p-[7px] border rounded-[8px] text-body16 transition-shadow focus:outline-none focus:ring-2 ring-offset-2 ring-sky-blue-700 caret-primary placeholder:text-regent-gray-600 placeholder:font-normal',
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
    </div>
  );
});

export default Input;
