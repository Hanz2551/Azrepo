import { getMaxLengthErrorMsg, getRequiredErrorMsg } from '@/utils/helpers/validations';
import { Descendant, Text } from 'slate';
import { CustomElement } from '@/utils/types/slate';

export const SettingNotificationSchema = {
  title: [
    { required: true, message: getRequiredErrorMsg('件名') },
    { maxLength: 255, message: getMaxLengthErrorMsg('件名', 255) },
  ],
  to: [{ required: true, message: getRequiredErrorMsg('送付先') }],
  startAt: [{ required: true, message: getRequiredErrorMsg('表示期間') }],
  endAt: [{ required: true, message: getRequiredErrorMsg('表示期間') }],
};

export const checkNotEmptyContentSlate = (value: Descendant[]) =>
  value.some((element) =>
    (element as CustomElement).children.some((childEl) => {
      if (Text.isText(childEl)) return !!childEl.text?.trim();
      if ((childEl as CustomElement).type === 'link') {
        return (childEl as CustomElement).children.some((childText) => !!childText.text?.trim());
      }
      return false;
    }),
  );
