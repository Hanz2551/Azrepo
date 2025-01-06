import React, { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { Descendant, Editor, Transforms } from 'slate';
import { Slate, Editable, RenderElementProps, RenderLeafProps } from 'slate-react';
import { Range } from 'slate';
import Link from './Link';
import Toolbar from './Toolbar';
import { getInitValue, SLATE_REMOVE_LINK_BUTTON_CLASS, SLATE_TOOLBAR_BUTTON_CLASS } from './utils';
import { cn } from '@/utils/helpers/tailwind';
import IconError from '@/assets/icons/icon_error_input.svg';
import { isKeyHotkey } from 'is-hotkey';

const renderElement = (props: RenderElementProps) => {
  const { element, children } = props;
  const attributes = props.attributes ?? {};

  switch (element.type) {
    case 'link':
      return <Link {...props} />;
    default:
      return <div {...attributes}>{children}</div>;
  }
};

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) children = <b>{children}</b>;
  return (
    <span style={{ paddingLeft: leaf.text === '' ? '0.1px' : 0 }} {...attributes}>
      {children}
    </span>
  );
};

type Props = {
  initValue: string;
  editor: Editor;
  error?: string;
  value: Descendant[];
  label: string;
  setSlateValue: Dispatch<SetStateAction<Descendant[]>>;
};

const textboxClass =
  '[&>[role=textbox]]:text-body16 [&>[role=textbox]]:font-medium [&>[role=textbox]]:border [&>[role=textbox]]:rounded-bl-md [&>[role=textbox]]:rounded-br-md [&>[role=textbox]] [&>[role=textbox]]:!min-h-[256px] [&>[role=textbox]:!outline-none [&>[role=textbox]:focus]:outline-none [&>[role=textbox]>[data-slate-node=element]]:mb-[24px] [&>[role=textbox]>[data-slate-node=element]:last-child]:mb-0';

export default function SlateEditor({ initValue, editor, label, error, setSlateValue }: Props) {
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const { selection } = editor;
      // Default left/right behavior is unit:'character'.
      // This fails to distinguish between two cursor positions, such as
      // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
      // Here we modify the behavior to unit:'offset'.
      // This lets the user step into and out of the inline without stepping over characters.
      // You may wish to customize this further to only use unit:'offset' in specific cases.
      if (selection && Range.isCollapsed(selection)) {
        const { nativeEvent } = event;
        if (isKeyHotkey('left', nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, { unit: 'offset', reverse: true });
          return;
        }
        if (isKeyHotkey('right', nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, { unit: 'offset' });
          return;
        }
      }
    },
    [editor],
  );

  const [isFocused, setIsFocused] = useState(false);

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const isClickToolbarBtn =
        e.relatedTarget?.classList.contains(SLATE_TOOLBAR_BUTTON_CLASS) ||
        e.relatedTarget?.classList.contains(SLATE_REMOVE_LINK_BUTTON_CLASS);
      if (!isClickToolbarBtn) {
        editor.deselect();
        setIsFocused(false);
      }
    },
    [editor],
  );

  const slate = useMemo(
    () => (
      <Slate editor={editor} initialValue={getInitValue(initValue)} onValueChange={setSlateValue}>
        <Toolbar error={error} />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder="入力してください"
          renderPlaceholder={({ children, attributes }) => {
            const { style, ...rest } = attributes;
            return (
              <span
                {...rest}
                style={{ ...style, opacity: 1, top: '8px' }}
                className="text-regent-gray-600 !font-normal"
              >
                {children}
              </span>
            );
          }}
          onKeyDown={onKeyDown}
        />
      </Slate>
    ),
    [editor, error, initValue, onKeyDown, setSlateValue, handleBlur],
  );

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className={`text-body16 font-medium ${error ? 'text-error' : ''}`}>{label}</label>
      )}
      <div
        className={cn(
          'rounded-md transition-shadow',
          textboxClass,
          isFocused && 'ring-2 ring-offset-2 ring-sky-blue-700',
          error
            ? '[&>[role=textbox]]:p-[6px] [&>[role=textbox]]:border-2 [&>[role=textbox]]:border-error'
            : '[&>[role=textbox]]:p-[7px]',
        )}
      >
        {slate}
      </div>
      {error && (
        <p className="text-error flex gap-1 items-center">
          <IconError />
          <span className="text-body14 font-medium">{error}</span>
        </p>
      )}
    </div>
  );
}
