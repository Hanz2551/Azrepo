import { RETURNING_OPTIONS_FILTER } from '@/utils/constants/bus';
import { EReturning } from '@/utils/types/bus';

const Returning = ({
  returning,
  returningBusName,
}: {
  returning: string | null;
  returningBusName?: string;
}) => {
  const returningValueConverted =
    returning === null
      ? EReturning.unregistered
      : returning === 'X'
        ? EReturning.notUse
        : EReturning.use;
  const target = RETURNING_OPTIONS_FILTER.find((it) => it.value === returningValueConverted);
  if (!target) return '';
  return (
    <div className="flex flex-col">
      <div className="inline-flex gap-2 items-center">
        <target.icon width={16} height={16} className={target.iconClassName} />
        <span className={`font-medium text-one-line16 ${target.textColorClassName || ''}`}>
          {target.label}
        </span>
      </div>
      {returningValueConverted === EReturning.use && (
        <div className="flex mt-2 text-regent-gray-700">
          <span className="inline-block text-one-line14">{returningBusName}：</span>
          <span className="inline-block font-lato text-one-line14">{returning}</span>
        </div>
      )}
    </div>
  );
};

export default Returning;
