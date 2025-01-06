import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import { useMemo, useState } from 'react';
import DatePicker from '@/components/atoms/DatePicker';
import { format } from 'date-fns';
import { TBodySetting, TNotificationDetail } from '@/utils/types/notification';
import { writingSelector } from '@/stores/notification/slice';
import { useSelector } from 'react-redux';
import SlateEditor from '@/components/molecules/SlateEditor';
import { withReact } from 'slate-react';
import { createEditor } from 'slate';
import {
  getInitValue,
  serialize,
  withLinks,
  // withPreventLinkDelete,
} from '@/components/molecules/SlateEditor/utils';
import { useRouter } from 'next/router';
import { GRADE_GROUP_OPTIONS, GRADE_OPTIONS } from '@/utils/constants/global';
import { MultiValue, PropsValue } from 'react-select';
import { getMaxLengthErrorMsg, getRequiredErrorMsg, validate } from '@/utils/helpers/validations';
import {
  SettingNotificationSchema,
  checkNotEmptyContentSlate,
} from '@/utils/validations/settingNotificationSchema';
import _isEmpty from 'lodash/isEmpty';
import AttachFile from './AttachFile';

type TOption = { value: string; label: string };

type TFormInputs = {
  title: string;
  range: (Date | null)[];
  to: PropsValue<TOption>;
};

type TErrors = {
  title?: string;
  to?: string;
  startAt?: string;
  endAt?: string;
  content?: string;
};

type TFile = { file: File | { id: number; name: string; delete?: boolean }; error?: string };

type Props = {
  notification?: TNotificationDetail;
  onSubmit: (value: TBodySetting) => void;
};

const getInitTo = (to: string) => {
  const targets = to.split(',');
  const value: TOption[] = [];
  targets.forEach((target) => {
    const option = GRADE_OPTIONS.find((option) => option.value === target);
    if (option) value.push(option);
  });
  return value;
};

export default function FormNotification({ notification, onSubmit }: Props) {
  const router = useRouter();
  const writing = useSelector(writingSelector);

  const slateEditor = useMemo(() => withLinks(withReact(createEditor())), []);
  const [slateValue, setSlateValue] = useState(getInitValue(notification?.content || ''));

  const [formInputs, setFormInputs] = useState<TFormInputs>({
    title: notification?.title || '',
    range: [
      notification?.startAt ? new Date(notification.startAt) : null,
      notification?.endAt ? new Date(notification.endAt) : null,
    ],
    to: notification?.to ? getInitTo(notification.to) : null,
  });

  const [errors, setErrors] = useState<TErrors>();

  const [files, setFiles] = useState<TFile[]>(
    !notification?.notificationFiles
      ? []
      : notification?.notificationFiles.map((file) => ({
          file: {
            id: file.id,
            name: file.fileName,
          },
        })),
  );
  const [deletedFilesId, setDeletedFilesId] = useState<number[]>([]);

  const hasFileError = useMemo(() => {
    return files.length > 0 && files.some((item) => !!item.error);
  }, [files]);

  const handleClickBack = () => {
    router.back();
  };

  const handleChange = ({ name, value }: { name: string; value: unknown }) => {
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // start validate basic fields
    const formInputsFormatted = {
      title: formInputs.title.trim(),
      startAt: formInputs.range[0] ? format(formInputs.range[0], 'yyyy-MM-dd') : '',
      endAt: formInputs.range[1] ? format(formInputs.range[1]!, 'yyyy-MM-dd') : '',
      to: (formInputs.to as MultiValue<TOption>)?.map((it) => it.value).join(',') || '',
    };
    const errorsBase = validate(SettingNotificationSchema, formInputsFormatted);
    setErrors(errorsBase);
    // end validate basic fields

    // start validate editor
    const editorHasValue = checkNotEmptyContentSlate(slateValue);
    if (!editorHasValue) {
      return setErrors((prev) => ({
        ...prev,
        content: getRequiredErrorMsg('本文'),
      }));
    }
    const contentSerialized = serialize({ children: slateEditor.children });
    if (contentSerialized.length > 2000) {
      return setErrors((prev) => ({
        ...prev,
        content: getMaxLengthErrorMsg('本文', 2000),
      }));
    }
    // end validate editor

    if (_isEmpty(errorsBase) && !hasFileError) {
      const currentFiles = files.map((item) =>
        'id' in item.file ? { file: { id: item.file.id } } : item,
      );
      const deletedFiles = deletedFilesId.map((id) => ({ file: { id, delete: true } }));
      const body: TBodySetting = {
        ...formInputsFormatted,
        content: contentSerialized,
        notificationFiles: currentFiles.concat(deletedFiles),
      };
      onSubmit(body);
    }
  };

  return (
    <>
      <div className="bg-white p-6 border rounded-lg flex flex-col gap-4">
        <Input
          name="title"
          label="件名"
          placeholder="入力してください"
          error={errors?.title}
          value={formInputs.title}
          onChange={handleChange}
        />

        <div className="flex gap-4">
          <div className="w-[calc(50%_-_8px)]">
            <Select
              name="to"
              label="送付先"
              placeholder="選択してください"
              isMulti
              options={GRADE_GROUP_OPTIONS}
              error={errors?.to}
              value={formInputs.to}
              onChange={handleChange}
            />
          </div>

          <div className="w-[calc(50%_-_8px)]">
            <DatePicker
              selectsRange
              name="range"
              label="表示期間"
              placeholder="選択してください"
              value={formInputs.range}
              minDate={new Date()}
              onChange={handleChange}
              error={errors?.startAt || errors?.endAt}
            />
          </div>
        </div>

        <SlateEditor
          initValue={notification?.content || ''}
          value={slateValue}
          editor={slateEditor}
          setSlateValue={setSlateValue}
          label="本文"
          error={errors?.content}
        />

        <AttachFile
          id="attach-file"
          existError={hasFileError}
          files={files}
          onChange={setFiles}
          onDelete={(id) => setDeletedFilesId((prev) => prev.concat(id))}
        />
      </div>

      <div className="flex justify-between mt-6">
        <Button
          className="min-w-[64px] h-[36px] text-[14px]"
          variant="outlined"
          type="secondary"
          disabled={writing}
          onClick={handleClickBack}
        >
          戻る
        </Button>

        <Button
          className="min-w-[64px] h-[36px] text-[14px]"
          loading={writing}
          onClick={handleSubmit}
        >
          保存
        </Button>
      </div>
    </>
  );
}
