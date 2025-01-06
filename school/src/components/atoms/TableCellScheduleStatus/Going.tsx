import { GOING_DISPLAY_FROM_SCHEDULE_RESPONSE, GOING_OPTIONS_FILTER } from '@/utils/constants/bus';
import _get from 'lodash/get';

const Going = ({ going }: { going: boolean | null }) => {
  const goingValueConverted = _get(GOING_DISPLAY_FROM_SCHEDULE_RESPONSE, String(going));
  const target = GOING_OPTIONS_FILTER.find((it) => it.value === goingValueConverted);
  if (!target) return '';
  return (
    <div className="inline-flex gap-2 items-center">
      <target.icon width={16} height={16} className={target.iconClassName} />
      <span className={`font-medium text-one-line16 ${target.textColorClassName || ''}`}>
        {target.label}
      </span>
    </div>
  );
};

export default Going;
