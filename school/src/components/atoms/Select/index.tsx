import ReactSelect, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  OptionsOrGroups,
  PropsValue,
  StylesConfig,
} from 'react-select';
import IconChevronDown from '@/assets/icons/icon_chevron_down.svg';
import { cn } from '@/utils/helpers/tailwind';
import IconError from '@/assets/icons/icon_error_input.svg';
import IconCheck from '@/assets/icons/icon_check.svg';

type TOption = { value: string; label: string };

type Props = {
  className?: string;
  name: string;
  label?: string;
  styles?: StylesConfig<TOption>;
  options: OptionsOrGroups<TOption, GroupBase<TOption>>;
  placeholder?: string;
  isMulti?: boolean;
  error?: string;
  disabled?: boolean;
  menuWidthClass?: string;
  value: PropsValue<TOption>;
  onChange: (payload: { name: string; value: PropsValue<TOption> }) => void;
};

const defaultStyles: StylesConfig<TOption> = {
  control: (styles) => ({
    ...styles,
    borderRadius: '8px',
    minHeight: '40px',
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    fontSize: '14px',
    lineHeight: '20px',
    ...(isFocused && { backgroundColor: '#dff1ff' }),
    ...(isSelected && { backgroundColor: '#0391dd' }),
  }),
  singleValue: (styles, { isDisabled }) => ({
    ...styles,
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 500,
    color: isDisabled ? '#a4aaae' : '#02121f',
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: '16px',
    lineHeight: '24px',
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    padding: '3px',
  }),
};

const DropdownIndicator = (props: DropdownIndicatorProps<TOption>) => {
  return (
    <components.DropdownIndicator {...props}>
      <IconChevronDown />
    </components.DropdownIndicator>
  );
};

const NoOptionsMessage = () => {
  return <p className="text-color-text-muted text-body14 text-center py-[8px]">オプションなし</p>;
};

const Option = (props: OptionProps<TOption>) => {
  const { onClick, ...restInnerProps } = props.innerProps;
  return (
    <div
      ref={props.innerRef}
      {...restInnerProps}
      className={cn(
        'flex items-center py-[6px] gap-2 pl-2',
        !props.isSelected && 'cursor-pointer',
        props.isFocused && 'bg-sky-blue-100 rounded-[4px]',
      )}
      {...(!props.isSelected && { onClick })}
    >
      <div className="w-[16px] h-[16px]">{props.isSelected && <IconCheck />}</div>
      <span className="text-body16 font-medium">{props.children}</span>
    </div>
  );
};

export default function Select({
  className = '',
  name,
  label,
  styles,
  options,
  placeholder,
  isMulti,
  error,
  disabled,
  menuWidthClass,
  value,
  onChange,
}: Props) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className={`text-body16 font-medium ${error ? 'text-error' : ''}`}>{label}</label>
      )}
      <ReactSelect
        isDisabled={disabled}
        isMulti={!!isMulti}
        {...(isMulti && { closeMenuOnSelect: false })}
        isClearable={false}
        styles={{ ...defaultStyles, ...styles }}
        options={options}
        placeholder={placeholder}
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => null,
          NoOptionsMessage,
          Option,
        }}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              '!transition-shadow',
              !error ? '!border-color-border' : '!border-error !border-2',
              isFocused && '!ring-2 ring-offset-2 ring-sky-blue-700',
            ),
          valueContainer: () => `!pr-0 ${error ? '!pl-[6px]' : '!px-[7px]'}`,
          indicatorsContainer: () => (error ? `!py-[2px]` : ''),
          placeholder: () => '!text-regent-gray-600',
          multiValue: () => '!bg-regent-gray-100',
          multiValueLabel: () => '!text-color-text !text-body14',
          multiValueRemove: () => '!text-color-text hover:!bg-energetic-red-200',
          menu: () =>
            `!shadow-popper !border !rounded-[8px] !mt-[5px] !px-[4px] ${menuWidthClass || ''}`,
          groupHeading: () => '!text-body14 !text-color-text-muted',
          menuList: () => 'scroller-y-base',
        }}
        value={value}
        onChange={(value) => onChange({ name, value })}
      />
      {error && (
        <p className="text-error flex gap-1 items-center">
          <IconError />
          <span className="text-body14 font-medium">{error}</span>
        </p>
      )}
    </div>
  );
}
