type Props = {
  label: string;
  checked: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function GoingCheckbox({ label, checked, value, onChange }: Props) {
  return (
    <li>
      <input
        type="radio"
        id={`going_${value}`}
        name={`going`}
        value={value}
        checked={checked}
        className="hidden peer"
        required
        onChange={onChange}
      />
      <label
        htmlFor={`going_${value}`}
        className="rounded-full inline-flex items-center px-[15px] h-[40px] gap-1 cursor-pointer border peer-checked:border-sky-blue-100 peer-checked:text-primary peer-checked:font-medium peer-checked:bg-sky-blue-100"
      >
        <span className="text-body16">{label}</span>
      </label>
    </li>
  );
}
