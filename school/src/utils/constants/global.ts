export const GRADE_DISPLAY = {
  1: '小1',
  2: '小2',
  3: '小3',
  4: '小4',
  5: '小5',
  6: '小6',
  7: '中1',
  8: '中2',
  9: '中3',
};

export const GRADE_OPTIONS = Object.entries(GRADE_DISPLAY).map(([value, label]) => ({
  value,
  label,
}));

export enum EGradeGroupLabel {
  primary = '小学生',
  'junior_high' = '中学生',
}

export const GRADE_GROUP_DISPLAY = {
  [EGradeGroupLabel.primary]: {
    1: '小1',
    2: '小2',
    3: '小3',
    4: '小4',
    5: '小5',
    6: '小6',
  },
  [EGradeGroupLabel.junior_high]: {
    7: '中1',
    8: '中2',
    9: '中3',
  },
};

export const GRADE_GROUP_OPTIONS = Object.entries(GRADE_GROUP_DISPLAY).map(([label, options]) => ({
  label,
  options: Object.entries(options).map(([value, label]) => ({ value, label })),
}));
