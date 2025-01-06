import React, { useMemo } from 'react';
import { RenderElementProps, useFocused, useSelected, useSlate } from 'slate-react';
import { SLATE_REMOVE_LINK_BUTTON_CLASS, unwrapLink } from '../utils';
import IconTrash from '@/components/atoms/Icon/IconTrash';

const allowedSchemes = ['http:', 'https:', 'mailto:', 'tel:'];

const InlineChromiumBugfix = () => (
  <span contentEditable={false} style={{ fontSize: '0px' }}>
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);

const Link = ({ attributes, element, children }: RenderElementProps) => {
  const editor = useSlate();
  const focused = useFocused();
  const selected = useSelected();

  const safeUrl = useMemo(() => {
    let parsedUrl: URL | null = null;
    try {
      parsedUrl = new URL(element.href!);
      // eslint-disable-next-line no-empty
    } catch {}
    if (parsedUrl && allowedSchemes.includes(parsedUrl.protocol)) {
      return parsedUrl.href;
    }
    return 'about:blank';
  }, [element.href]);

  return (
    <div {...attributes} className="inline relative">
      <a href={safeUrl} target={element.target} className="text-primary underline font-medium">
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />
      </a>

      {focused && selected && (
        <div
          className="absolute left-[50%] translate-x-[-50%] top-[calc(100%_+_4px)] bg-white z-[1] border shadow-popper rounded-md py-2 px-3 flex gap-3"
          contentEditable={false}
        >
          <a
            className="text-primary font-medium underline max-w-[260px]"
            href={element.href}
            target={element.target}
          >
            {element.href}
          </a>
          <button className={SLATE_REMOVE_LINK_BUTTON_CLASS} onClick={() => unwrapLink(editor)}>
            <IconTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default Link;
