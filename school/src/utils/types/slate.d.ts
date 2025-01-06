import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

type CustomElement = {
  type: string;
  children: CustomText[];
  href?: string;
  target?: string;
  text?: string;
};
type CustomText = { text?: string; bold?: true };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
