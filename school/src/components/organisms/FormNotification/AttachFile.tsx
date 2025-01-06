import IconSpin from '@/components/atoms/Icon/IconSpin';
import IconTrash from '@/components/atoms/Icon/IconTrash';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import IconError from '@/assets/icons/icon_error_input.svg';
import clsx from 'clsx';
import { cn } from '@/utils/helpers/tailwind';
import IconCloudUpload from '@/components/atoms/Icon/IconCloudUpload';
import { useAppDispatch } from '@/stores';
import { setToast } from '@/stores/global/slice';
import { validateFileUpload } from '@/utils/helpers/notification';
import { MAX_FILES_UPLOAD } from '@/utils/constants/notification';

type TFile = { file: File | { id: number; name: string; delete?: boolean }; error?: string };

type Props = {
  id: string;
  existError?: boolean;
  files: TFile[];
  onChange: Dispatch<SetStateAction<TFile[]>>;
  onDelete: (id: number) => void;
};

export default function AttachFile({ id, existError, files, onChange, onDelete }: Props) {
  const dispatch = useAppDispatch();

  const [inputTimestamp, setInputTimestamp] = useState<number | null>(null);

  const disabled = useMemo(() => {
    return files.length === MAX_FILES_UPLOAD || inputTimestamp !== null;
  }, [files, inputTimestamp]);

  const createInputTimestamp = () => {
    setInputTimestamp(new Date().getTime());
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files?.length) return setInputTimestamp(null);
    if (
      e.target.files.length > MAX_FILES_UPLOAD ||
      e.target.files.length + files.length > MAX_FILES_UPLOAD
    ) {
      dispatch(
        setToast({
          status: 'error',
          message:
            'ファイルのアップロードに失敗しました。ファイルは最大5つまでアップロード可能です。',
        }),
      );
      setInputTimestamp(null);
      return (e.target.value = '');
    }
    const numberOfFiles = e.target.files.length;
    const delay = 400 + numberOfFiles * 60;
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      error: validateFileUpload(file),
    }));
    const timestamp = new Date().getTime();
    if (timestamp - inputTimestamp! > delay) {
      onChange(files.concat(newFiles));
      setInputTimestamp(null);
      e.target.value = '';
    } else {
      setTimeout(
        () => {
          onChange(files.concat(newFiles));
          setInputTimestamp(null);
          e.target.value = '';
        },
        delay - (timestamp - inputTimestamp!),
      );
    }
  };

  const handleDelete = (index: number, id?: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);
    if (id) onDelete(id);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className={`text-body16 font-medium ${existError ? 'text-error' : ''}`}>
        添付ファイル
      </label>

      <label
        htmlFor={id}
        className={cn(
          `text-[16px] font-medium inline-flex justify-center items-center w-[156px] h-[40px] gap-[2px] border rounded-md bg-white hover:bg-regent-gray-50 transition-all focus:outline-none ${!disabled ? 'focus:ring-2' : ''} ring-offset-2 ring-sky-blue-700 cursor-pointer`,
          disabled &&
            'text-regent-gray-400 bg-regent-gray-100 cursor-not-allowed hover:bg-regent-gray-100',
        )}
      >
        {inputTimestamp !== null ? (
          <IconSpin fillColorClass="fill-regent-gray-400" />
        ) : (
          <IconCloudUpload />
        )}
        <span className="whitespace-nowrap px-1">ファイルを選択</span>
        <input
          id={id}
          type="file"
          multiple
          className="hidden"
          accept=".jpeg,.jpg,.gif,.png,.pdf"
          disabled={disabled}
          onChange={handleChange}
          onInput={createInputTimestamp}
        />
      </label>

      <p className="text-body14 text-color-text-muted">
        最大5つのファイル、各3MBまで
        <br />
        許可されるファイル形式: JPEG、JPG、GIF、PNG、PDF
      </p>

      <div className="flex flex-col gap-2">
        {files.map((item, index) => (
          <div
            key={index}
            className={clsx(
              'w-full bg-regent-gray-50 p-[6px] rounded-[8px] border border-[2px]',
              item.error ? 'border-error bg-energetic-red-50' : 'border-regent-gray-50',
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-body16 font-medium break-all">{item.file.name}</span>
              <button
                className={clsx('p-1', inputTimestamp !== null && 'pointer-events-none')}
                onClick={() => handleDelete(index, 'id' in item.file ? item.file.id : undefined)}
              >
                <IconTrash />
              </button>
            </div>
            {item.error && (
              <p className="text-error flex gap-1 items-center mt-2">
                <IconError />
                <span className="text-body14 font-medium">{item.error}</span>
              </p>
            )}
          </div>
        ))}
        {inputTimestamp !== null && (
          <p className="bg-regent-gray-100 px-2 py-[10px] text-body14 font-medium text-color-text-muted rounded-[8px]">
            アップロード中...
          </p>
        )}
      </div>
    </div>
  );
}
