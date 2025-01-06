type Props = {
  label: string;
  checked: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function ReturningCheckbox({ label, checked, value, onChange }: Props) {
  return (
    <li>
      <input
        type="radio"
        id={`returning_${value}`}
        name={`returning`}
        value={value}
        checked={checked}
        className="hidden peer"
        required
        onChange={onChange}
      />
      <label
        htmlFor={`returning_${value}`}
        className="rounded-full min-w-[74px] inline-flex items-center px-[15px] h-[40px] gap-1 cursor-pointer border peer-checked:border-sky-blue-100 peer-checked:text-primary peer-checked:font-medium peer-checked:bg-sky-blue-100"
      >
        <span className={`text-body16 ${value !== 'X' ? 'font-lato' : ''}`}>{label}</span>
      </label>
    </li>
  );
}
