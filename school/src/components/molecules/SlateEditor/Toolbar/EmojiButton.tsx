import { useEffect, useMemo, useRef, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import emojiList from './full-emoji-list.json';
import { Transforms } from 'slate';
import { SLATE_TOOLBAR_BUTTON_CLASS } from '../utils';

export default function EmojiButton() {
  const editor = useSlate();
  const btnRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const disabled = useMemo(() => {
    return !editor.selection;
  }, [editor.selection]);

  useEffect(() => {
    const handleDocumentClick: EventListener = (e) => {
      const clickedComponent = e.target;
      if (!btnRef?.current?.contains(clickedComponent as Node)) {
        setShowPopup(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const insertEmoji = (emoji: string) => {
    Transforms.insertText(editor, emoji);
    setShowPopup(false);
    ReactEditor.focus(editor);
  };

  return (
    <div ref={btnRef} className="mx-2 inline-flex relative">
      <button
        className={`${SLATE_TOOLBAR_BUTTON_CLASS} rounded text-sm h-[22px] w-[22px] inline-flex items-center justify-center ${showPopup ? 'ring-2 ring-sky-blue-700' : ''} ${disabled ? 'cursor-not-allowed' : ''}`}
        onClick={() => setShowPopup((prev) => !prev)}
        disabled={disabled}
      >
        😀
      </button>
      {showPopup && (
        <div className="absolute left-0 top-[calc(100%_+_4px)] bg-white z-[1] border  shadow-md rounded-md py-3">
          <ul className="flex gap-[3px] flex-wrap px-4">
            {emojiList.map((group, index) => (
              <li key={group.slug}>
                <span
                  title={group.slug}
                  className={`inline-block w-[28px] h-[28px] inline-flex items-center justify-center border-b-2 rounded-t-lg
                      ${
                        activeTab === index
                          ? 'cursor-default text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                          : 'cursor-pointer border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 grayscale opacity-[0.5]'
                      }`}
                  onClick={() => setActiveTab(index)}
                >
                  {group.emojis[0].emoji}
                </span>
              </li>
            ))}
          </ul>
          <div className="pl-[16px] pr-[4px] mt-2">
            <div className="w-[315px] h-[307px] scroller-y-base">
              <div className="flex gap-[3px] flex-wrap w-[307px]">
                {emojiList[activeTab].emojis.map((item) => (
                  <span
                    className="w-[28px] h-[28px] inline-flex justify-center items-center cursor-pointer"
                    key={item.no}
                    onClick={() => insertEmoji(item.emoji)}
                  >
                    {item.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
