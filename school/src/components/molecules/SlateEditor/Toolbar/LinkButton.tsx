import { useEffect, useMemo, useRef, useState } from 'react';
import { SLATE_TOOLBAR_BUTTON_CLASS, wrapLink } from '../utils';
import Input from '@/components/atoms/Input';
import IconPlus from '@/assets/icons/icon_plus.svg';
import IconLink from '@/assets/icons/icon_link.svg';
import { useSlate } from 'slate-react';

const LinkButton = () => {
  const editor = useSlate();
  const btnRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string>('');
  const [showInNewTab, setShowInNewTab] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleInsertLink = () => {
    wrapLink(editor, { href: url, showInNewTab });
    setUrl('');
    setShowPopup((prev) => !prev);
    setShowInNewTab(false);
  };

  const toggleLink = () => {
    setShowPopup((prev) => !prev);
  };

  const handleInputChange = ({ value }: { value: string }) => {
    setUrl(value);
  };

  const handleChangeShowInNewTab = () => {
    setShowInNewTab((prev) => !prev);
  };

  return (
    <div ref={btnRef} className="relative inline-flex mx-2">
      <button
        className={`${SLATE_TOOLBAR_BUTTON_CLASS} p-[3px] rounded ${showPopup ? 'ring-2 ring-sky-blue-700' : ''} ${disabled ? 'cursor-not-allowed' : ''}`}
        onClick={toggleLink}
        disabled={disabled}
      >
        <IconLink />
      </button>
      {showPopup && (
        <div className="absolute left-2 top-[calc(100%_+_4px)] bg-white z-[1] border  shadow-md rounded-md py-3 px-4">
          <div className="flex items-center gap-2">
            <Input name="link" value={url} onChange={handleInputChange} className="w-[280px]" />
            <div onClick={handleInsertLink} className="cursor-pointer">
              <IconPlus className="[&>path]:stroke-primary" />
            </div>
          </div>
          <label className="inline-flex gap-2 mt-3">
            <input type="checkbox" checked={showInNewTab} onChange={handleChangeShowInNewTab} />
            <span style={{ fontSize: '0.8em' }}>Open in new tab</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default LinkButton;
