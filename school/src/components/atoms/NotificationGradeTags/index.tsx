import { EGradeGroupLabel, GRADE_DISPLAY, GRADE_GROUP_DISPLAY } from '@/utils/constants/global';
import _get from 'lodash/get';

const Tag = ({ iconBg, text }: { iconBg: string; text: string }) => {
  return (
    <div className="border border-color-border rounded-[4px] pl-[3px] pr-[7px] py-[3px] inline-flex items-center gap-1">
      <div className="w-[16px] h-[16px] p-1">
        <div className={`w-[8px] h-[8px] ${iconBg} rounded-full`} />
      </div>
      <span className="text-one-line14B">{text}</span>
    </div>
  );
};

export default function NotificationGradeTags({ value }: { value?: string }) {
  if (!value) return null;

  const grades = value.split(',');
  const groupedGrades = {
    [EGradeGroupLabel.primary]: [] as string[],
    [EGradeGroupLabel.junior_high]: [] as string[],
  };
  grades.forEach((grade) => {
    if (_get(GRADE_GROUP_DISPLAY[EGradeGroupLabel.primary], grade))
      groupedGrades[EGradeGroupLabel.primary].push(grade);
    else groupedGrades[EGradeGroupLabel.junior_high].push(grade);
  });
  const isFullPrimary =
    groupedGrades[EGradeGroupLabel.primary].length ===
    Object.keys(GRADE_GROUP_DISPLAY[EGradeGroupLabel.primary]).length;
  const isFullJuniorHigh =
    groupedGrades[EGradeGroupLabel.junior_high].length ===
    Object.keys(GRADE_GROUP_DISPLAY[EGradeGroupLabel.junior_high]).length;

  return (
    <div className="w-full flex flex-wrap gap-1">
      {isFullPrimary ? (
        <Tag iconBg="bg-primary" text={EGradeGroupLabel['primary']} />
      ) : (
        groupedGrades[EGradeGroupLabel.primary].map((grade) => (
          <Tag key={grade} iconBg="bg-primary" text={_get(GRADE_DISPLAY, grade)} />
        ))
      )}
      {isFullJuniorHigh ? (
        <Tag iconBg="bg-bright-pink-500" text={EGradeGroupLabel['junior_high']} />
      ) : (
        groupedGrades[EGradeGroupLabel.junior_high].map((grade) => (
          <Tag key={grade} iconBg="bg-bright-pink-500" text={_get(GRADE_DISPLAY, grade)} />
        ))
      )}
    </div>
  );
}
