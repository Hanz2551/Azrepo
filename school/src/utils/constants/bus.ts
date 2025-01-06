import { EGoing, EReturning } from '@/utils/types/bus';
import IconCircleCheck from '@/components/atoms/Icon/IconCircleCheck';
import IconCircleX from '@/components/atoms/Icon/IconCircleX';
import IconTriangleAlert from '@/components/atoms/Icon/IconTriangleAlert';

export const GOING_OPTIONS = {
  [EGoing.use]: '利用する',
  [EGoing.notUse]: '利用しない',
  [EGoing.unregistered]: '未記入',
};

export const GOING_OPTIONS_FILTER = [
  { value: EGoing.use, label: '利用する', icon: IconCircleCheck, iconClassName: 'text-primary' },
  {
    value: EGoing.notUse,
    label: '利用しない',
    icon: IconCircleX,
    iconClassName: 'text-regent-gray-600',
  },
  {
    value: EGoing.unregistered,
    label: '未記入',
    icon: IconTriangleAlert,
    iconClassName: 'text-error',
    textColorClassName: 'text-error',
  },
];

export const RETURNING_OPTIONS = {
  [EReturning.use]: '利用する',
  [EReturning.notUse]: '利用しない',
  [EReturning.unregistered]: '未記入',
};

export const RETURNING_OPTIONS_FILTER = [
  {
    value: EReturning.use,
    label: '利用する',
    icon: IconCircleCheck,
    iconClassName: 'text-primary',
  },
  {
    value: EReturning.notUse,
    label: '利用しない',
    icon: IconCircleX,
    iconClassName: 'text-regent-gray-600',
  },
  {
    value: EReturning.unregistered,
    label: '未記入',
    icon: IconTriangleAlert,
    iconClassName: 'text-error',
    textColorClassName: 'text-error',
  },
];

export const GOING_DISPLAY_FROM_SCHEDULE_RESPONSE = {
  true: EGoing.use,
  false: EGoing.notUse,
  null: EGoing.unregistered,
};

export const RETURNING_DISPLAY_FROM_SCHEDULE_RESPONSE = {
  X: EReturning.notUse,
  null: EReturning.unregistered,
};
