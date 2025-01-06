import IconBold from '@/assets/icons/icon_bold.svg';
import { isMarkActive, SLATE_TOOLBAR_BUTTON_CLASS, toggleMark } from '../utils';
import { useSlate } from 'slate-react';
import { useMemo } from 'react';

export default function BoldButton() {
  const editor = useSlate();

  const disabled = useMemo(() => {
    return !editor.selection;
  }, [editor.selection]);

  return (
    <div className="mx-2 inline-flex">
      <button
        disabled={disabled}
        className={`${SLATE_TOOLBAR_BUTTON_CLASS} rounded p-[3px] ${isMarkActive(editor, 'bold') ? 'ring-2 ring-sky-blue-700' : ''} ${disabled ? 'cursor-not-allowed' : ''}`}
        onClick={() => {
          toggleMark(editor, 'bold');
        }}
      >
        <IconBold />
      </button>
    </div>
  );
}
