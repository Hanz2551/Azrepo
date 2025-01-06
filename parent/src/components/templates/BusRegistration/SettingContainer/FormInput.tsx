import { TSchedule } from '@/utils/types/bus';
import DateTitle from '../DateTitle';
import GoingCheckbox from '@/components/atoms/GoingCheckbox';
import ReturningCheckbox from '@/components/atoms/ReturningCheckbox';
import { TReturningBus } from '@/utils/types/global';

type Props = {
  scheduleInput: TSchedule[];
  returningBus: TReturningBus[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function FormInput({ scheduleInput, returningBus, onChange }: Props) {
  return scheduleInput?.map((item, index) => (
    <div className="bg-white rounded-[8px] p-4" key={index}>
      <DateTitle date={item.date} />
      <div className="flex flex-col gap-2 mb-4">
        <p className="text-body14 font-medium text-color-text-muted">登校</p>
        <ul className="flex gap-1">
          <GoingCheckbox
            date={item.date}
            checked={String(item.going) === 'true'}
            label="利用する"
            value="true"
            onChange={onChange}
          />
          <GoingCheckbox
            date={item.date}
            checked={String(item.going) === 'false'}
            label="利用しない"
            value="false"
            onChange={onChange}
          />
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-body14 font-medium text-color-text-muted">下校</p>
        <ul className="flex flex-wrap gap-1">
          {returningBus?.map((option) => (
            <ReturningCheckbox
              key={`${item.date}_${option.value}`}
              date={item.date}
              label={option.value}
              value={option.value}
              checked={item.returning === option.value}
              onChange={onChange}
            />
          ))}
          <ReturningCheckbox
            date={item.date}
            label="利用しない"
            value="X"
            checked={item.returning === 'X'}
            onChange={onChange}
          />
        </ul>
      </div>
    </div>
  ));
}
