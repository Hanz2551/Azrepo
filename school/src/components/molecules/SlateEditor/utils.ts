import {
  Editor,
  Transforms,
  Range,
  Element as SlateElement,
  Text,
  Descendant,
  Node as SlateNode,
} from 'slate';
import { jsx } from 'slate-hyperscript';
import escapeHtml from 'escape-html';

export const SLATE_TOOLBAR_BUTTON_CLASS = 'slate-toolbar-btn';
export const SLATE_REMOVE_LINK_BUTTON_CLASS = 'slate-remove-link-btn';

export const withLinks = (editor: Editor) => {
  const { isInline, normalizeNode } = editor;

  editor.isInline = (element) => (element.type === 'link' ? true : isInline(element));

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (SlateElement.isElement(node) && node.type === 'paragraph') {
      const children = Array.from(SlateNode.children(editor, path));
      for (const [child, childPath] of children) {
        // remove link nodes whose text value is empty string.
        // empty text links happen when you move from link to next line or delete link line.
        if (
          SlateElement.isElement(child) &&
          child.type === 'link' &&
          child.children[0].text === ''
        ) {
          if (children.length === 1) {
            Transforms.removeNodes(editor, { at: path });
            Transforms.insertNodes(editor, {
              type: 'paragraph',
              children: [{ text: '' }],
            });
          } else {
            Transforms.removeNodes(editor, { at: childPath });
          }
          return;
        }
      }
    }
    normalizeNode(entry);
  };

  return editor;
};

// export const withPreventLinkDelete = (editor: Editor) => {
//   const { deleteBackward } = editor;

//   editor.deleteBackward = (unit: TextUnit) => {
//     deleteBackward(unit);
//   };

//   return editor;
// };

export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) => {
      return !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link';
    },
  }) as any; // eslint-disable-line
  return !!link;
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

export const wrapLink = (
  editor: Editor,
  { href, showInNewTab }: { href: string; showInNewTab: boolean },
) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    href,
    ...(showInNewTab && { target: '_blank' }),
    children: isCollapsed ? [{ text: href }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);

  return marks ? marks[format as keyof typeof marks] === true : false;
};

export const serialize = (node: {
  type?: string;
  children: Descendant[];
  href?: string;
  target?: string;
}): string => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<b>${string}</b>`;
    }
    return string;
  }

  const children = node.children.map((n) => serialize(n as SlateElement)).join('');

  switch (node.type) {
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'link':
      return `<a href="${escapeHtml(node.href)}"${node.target ? ` target="${node.target}"` : ''}>${children}</a>`;
    default:
      return children;
  }
};

export const deserialize = (el: ChildNode, markAttributes = {}): Descendant | Descendant[] => {
  if (el.nodeType === Node.TEXT_NODE) {
    return jsx('text', markAttributes, el.textContent);
  } else if (el.nodeType !== Node.ELEMENT_NODE) {
    return [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ];
  }

  const nodeAttributes: Record<string, unknown> = { ...markAttributes };

  // define attributes for text nodes
  switch (el.nodeName) {
    case 'B':
      nodeAttributes.bold = true;
  }

  const children = Array.from(el.childNodes)
    .map((node) => deserialize(node, nodeAttributes))
    .flat();

  if (children.length === 0) {
    children.push(jsx('text', nodeAttributes, ''));
  }

  switch (el.nodeName) {
    case 'BODY':
      return jsx('fragment', {}, children);
    case 'P':
      return jsx('element', { type: 'paragraph' }, children);
    case 'A':
      return jsx(
        'element',
        {
          type: 'link',
          href: (el as HTMLElement).getAttribute('href'),
          target: (el as HTMLElement).getAttribute('target'),
        },
        children,
      );
    default:
      return children;
  }
};

export const getInitValue = (html: string): Descendant[] => {
  if (!html)
    return [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ];
  const document = new DOMParser().parseFromString(html, 'text/html');
  return deserialize(document.body) as Descendant[];
};

export const resetSlateValue = (editor: Editor) => {
  Transforms.delete(editor, { at: [0] });
  editor.children = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
};
