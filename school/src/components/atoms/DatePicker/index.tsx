import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';
import IconCalendar from '@/assets/icons/icon_calendar.svg';
import { cn } from '@/utils/helpers/tailwind';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale/ja';
import IconError from '@/assets/icons/icon_error_input.svg';

registerLocale('ja', ja);
setDefaultLocale('ja');

type TSingleValue = Date | null;
type TRangeValue = TSingleValue[];

type Props = {
  label?: string;
  value: TSingleValue | TRangeValue;
  className?: string;
  name: string;
  minDate?: Date;
  selectsRange?: true;
  placeholder?: string;
  error?: string;
  onChange: (params: { name: string; value: TSingleValue | TRangeValue }) => void;
};

export default function MyDatePicker({
  label,
  value,
  className,
  name,
  minDate,
  selectsRange,
  placeholder = '',
  error,
  onChange,
}: Props) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className={`text-body16 font-medium ${error ? 'text-error' : ''}`}>{label}</label>
      )}
      <div className="relative">
        <DatePicker
          showPopperArrow={false}
          {...(selectsRange
            ? {
                selectsRange: true,
                startDate: (value as TRangeValue)[0] || undefined,
                endDate: (value as TRangeValue)[1] || undefined,
                onChange: (value) => onChange({ name, value }),
              }
            : {
                selected: value as TSingleValue,
                onChange: (value) => onChange({ name, value }),
              })}
          popperPlacement="bottom-start"
          popperProps={{
            transform: false,
          }}
          popperModifiers={[
            {
              name: 'custom',
              fn(state) {
                return {
                  ...state,
                  y: 44,
                };
              },
            },
          ]}
          showIcon
          icon={<IconCalendar />}
          dateFormat="yyyy/MM/dd"
          {...(minDate && { minDate })}
          className={error ? 'has-error' : ''}
          onKeyDown={(e) => e.preventDefault()}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex justify-between items-center px-2 py-1">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="border rounded p-[5px] text-regent-gray-900"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="#23313C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <span className="text-sm font-medium font-lato text-color-text">
                {format(date, 'yyyy/MM')}
              </span>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="border  rounded p-[5px] text-regent-gray-900"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="#23313C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
          placeholderText={placeholder}
          locale="ja"
        />
      </div>
      {error && (
        <p className="text-error flex gap-1 items-center">
          <IconError />
          <span className="text-body14 font-medium">{error}</span>
        </p>
      )}
    </div>
  );
}
