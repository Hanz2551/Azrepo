import Button from '@/components/atoms/Button';
import IconChevronLeft from '@/components/atoms/Icon/ChevronLeft';
import IconChevronRight from '@/components/atoms/Icon/ChevronRight';

type Props = {
  value: { year: number; month: number };
  onChange: (params: Record<string, number>) => void;
};

export default function MonthPicker({ value, onChange }: Props) {
  const handlePrevMonth = () => {
    if (value.month === 1) {
      onChange({ month: 12, year: value.year - 1 });
    } else {
      onChange({ month: value.month - 1 });
    }
  };

  const handleNextMonth = () => {
    if (value.month === 12) {
      onChange({ month: 1, year: value.year + 1 });
    } else {
      onChange({ month: value.month + 1 });
    }
  };

  return (
    <div className="w-[224px] flex items-center justify-between">
      <Button
        className="w-[32px] h-[32px]"
        variant="outlined"
        type="secondary"
        onClick={handlePrevMonth}
      >
        <IconChevronLeft />
      </Button>
      <span className="text-body16B font-lato">{`${value.year}/${`0${value.month}`.slice(-2)}`}</span>
      <Button
        className="w-[32px] h-[32px]"
        variant="outlined"
        type="secondary"
        onClick={handleNextMonth}
      >
        <IconChevronRight />
      </Button>
    </div>
  );
}
