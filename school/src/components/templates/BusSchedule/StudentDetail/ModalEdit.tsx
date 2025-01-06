import Button from '@/components/atoms/Button';
import GoingCheckbox from '@/components/atoms/GoingCheckbox';
import ReturningCheckbox from '@/components/atoms/ReturningCheckbox';
import Modal from '@/components/molecules/Modal';
import { useAppDispatch } from '@/stores';
import { editStudentDateSchedule } from '@/stores/bus/slice';
import { returningBusSelector } from '@/stores/global/slice';
import { getDayOfWeekJa } from '@/utils/helpers/dateTime';
import { TStudentScheduleInDetail } from '@/utils/types/bus';
import { format } from 'date-fns';
import { useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  studentId: number;
  schedule: TStudentScheduleInDetail;
  month: string;
  onClose: () => void;
};

export default function ModalEdit({ studentId, schedule, month, onClose }: Props) {
  const dispatch = useAppDispatch();

  const returningBus = useSelector(returningBusSelector);

  const [formInputs, setFormInputs] = useState({
    going: schedule.going,
    returning: schedule.returning,
  });

  const [loading, setLoading] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({
      going: name === 'going' ? value === 'true' : prev.going,
      returning: name === 'returning' ? value : prev.returning,
    }));
  };

  const handleSubmit = () => {
    if (loading) return;
    setLoading(true);
    dispatch(
      editStudentDateSchedule({
        studentId,
        body: {
          month: format(schedule.date, 'yyyy-MM'),
          schedule: [
            {
              ...formInputs,
              date: schedule.date,
            },
          ],
        },
      }),
    )
      .unwrap()
      .then(() => {
        onClose();
      })
      .finally(() => setLoading(false));
  };

  if (!schedule) return false;

  return (
    <Modal
      title="申請状況変更"
      subTitle="保護者様への連絡をした後に変更してください。"
      onClose={onClose}
      footer={
        <Button className="h-[40px] w-full" loading={loading} onClick={handleSubmit}>
          保存
        </Button>
      }
      loading={loading}
    >
      <p className="leading-[20px] font-bold mb-4">
        <span className="font-lato text-[16px] leading-[20px]">
          {format(schedule.date, 'MM/dd')}
        </span>
        <span className="ml-1 text-[16px] leading-[20px]">({getDayOfWeekJa(schedule.date)})</span>
      </p>
      <div className="flex flex-col gap-2 mb-4">
        <p className="text-body14 font-medium">登校</p>
        <ul className="gap-1 flex flex-wrap">
          <GoingCheckbox
            label="利用する"
            checked={String(formInputs.going) === 'true'}
            value="true"
            onChange={handleChange}
          />
          <GoingCheckbox
            label="利用しない"
            checked={String(formInputs.going) === 'false'}
            value="false"
            onChange={handleChange}
          />
        </ul>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <p className="text-body14 font-medium">下校</p>
        <ul className="gap-1 flex flex-wrap">
          {returningBus?.[month]?.map((option) => (
            <ReturningCheckbox
              key={option.value}
              label={option.value}
              value={option.value}
              checked={formInputs.returning === option.value}
              onChange={handleChange}
            />
          ))}
          <ReturningCheckbox
            label="利用しない"
            value="X"
            checked={formInputs.returning === 'X'}
            onChange={handleChange}
          />
        </ul>
      </div>
    </Modal>
  );
}
