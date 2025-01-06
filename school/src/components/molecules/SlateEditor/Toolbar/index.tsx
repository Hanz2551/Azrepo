import React from 'react';
import LinkButton from './LinkButton';
import BoldButton from './BoldButton';
import EmojiButton from './EmojiButton';

const Toolbar = ({ error }: { error?: string }) => {
  return (
    <div
      className={`flex gap-1 border border-b-0 items-center rounded-tl-md rounded-tr-md h-[40px] ${error ? 'px-[3px] border-2 border-error' : 'px-[4px]'}`}
    >
      <BoldButton />
      <LinkButton />
      <EmojiButton />
    </div>
  );
};

export default Toolbar;
