import Button from '@/components/atoms/Button';
import { useEffect, useRef, useState } from 'react';
import IconPlus from '@/assets/icons/icon_plus.svg';
import Checkbox from '@/components/atoms/Checkbox';
import { cn } from '@/utils/helpers/tailwind';

type Props = {
  name: string;
  btnLabel: string;
  placement?: { tablet: 'right' };
  options: {
    value: string;
    label: string;
    icon?: React.FC<Record<string, unknown>>;
    iconClassName?: string;
  }[];
  numbers: number[];
  filterValue?: string[];
  onChange: (payload: { name: string; value: string[] }) => void;
};

export default function DropdownFilter({
  name,
  btnLabel,
  placement,
  numbers,
  options,
  filterValue,
  onChange,
}: Props) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    const handleDocumentClick: EventListener = (e) => {
      const clickedComponent = e.target;
      if (!btnRef?.current?.contains(clickedComponent as Node)) {
        setShowPopup(false);
        setValue(filterValue || []);
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  const handleChange = (value: string, checked: boolean) => {
    if (checked) setValue((prev) => prev.concat(value));
    else setValue((prev) => prev.filter((val) => val !== value));
  };

  const reset = () => {
    setValue([]);
    onChange({ name, value: [] });
    setShowPopup(false);
  };

  const onSubmit = () => {
    onChange({ name, value });
    setShowPopup(false);
  };

  const toggle = () => {
    if (showPopup) {
      setShowPopup(false);
      setValue(filterValue || []);
    } else {
      setShowPopup(true);
    }
  };

  const renderSelectedValue = (val: string) => {
    const target = options.find((op) => op.value === val);
    return (
      <span
        key={`${name}_${val}`}
        className={`bg-regent-gray-100 text-body14 ${!target ? '' : 'px-[4px] py-[2px]'} rounded-[4px]`}
      >
        {target?.label || ''}
      </span>
    );
  };

  return (
    <div ref={btnRef} className="relative">
      <Button
        variant="outlined"
        type="secondary"
        icon={IconPlus}
        className="px-2 h-[40px]"
        trimText
        onClick={toggle}
      >
        {btnLabel}
        {!!filterValue?.length && filterValue.length > 2 && (
          <>
            <span className="h-[16px] border-l mx-2" />
            <span className="bg-regent-gray-100 text-body14 px-[4px] py-[2px] rounded-[4px]">
              {filterValue.length}つ選択中
            </span>
          </>
        )}
        {!!filterValue?.length && filterValue.length <= 2 && (
          <>
            <span className="h-[16px] border-l mx-2" />
            <span className="inline-flex gap-1">
              {filterValue.map((val) => renderSelectedValue(val))}
            </span>
          </>
        )}
      </Button>
      {showPopup && (
        <div
          className={cn(
            'absolute top-[calc(100%_+_4px)] min-w-[200px] bg-white z-[1] border shadow-popper rounded-md p-1',
            placement?.tablet === 'right' ? 'left-auto lg:left-0 right-0 lg:right-0' : 'left-0',
          )}
        >
          {options.map((option, index) => (
            <div key={`${name}_${option.value}`} className="flex items-center px-[8px] py-[6px]">
              <Checkbox
                id={`${name}_${option.value}`}
                fullWidth
                checked={value.includes(option.value)}
                onChange={(checked) => handleChange(option.value, checked)}
              >
                <label
                  className="flex-grow flex justify-between items-center cursor-pointer text-body14"
                  htmlFor={`${name}_${option.value}`}
                >
                  {option.icon && (
                    <option.icon
                      width={16}
                      height={16}
                      className={cn('min-w-[16px] text-primary ml-2', option.iconClassName)}
                    />
                  )}
                  <span className="flex-grow pl-2">{option.label}</span>
                  <span className="font-lato text-body14">{numbers[index] || 0}</span>
                </label>
              </Checkbox>
            </div>
          ))}
          <div className="flex gap-2 px-[8px] py-[6px] mt-2">
            <Button
              variant="outlined"
              type="secondary"
              className="w-[66px] text-[14px]"
              onClick={reset}
            >
              クリア
            </Button>
            <Button className="flex-grow text-[14px]" onClick={onSubmit}>
              適用
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
