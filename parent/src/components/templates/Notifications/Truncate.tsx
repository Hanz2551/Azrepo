import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

export default function Truncate({ content, isRead }: { content: string; isRead: boolean }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;
    const scroller = elementRef.current;
    /**Although max lines is 2 and line-height = 20 (max height = 40)
     * however with some long characters like j and p, the actual length can be > 20
     * -> set over 60 for safety */
    if (scroller.scrollHeight >= 60) {
      setIsOver(true);
    }
  }, []);

  return (
    <div
      className={clsx(
        'relative',
        isOver && `pb-3 after:content-['...'] after:absolute after:left-0 after:-bottom-1`,
        isRead && 'after:text-color-text-muted',
      )}
    >
      <div
        ref={elementRef}
        className={clsx(
          'text-body14 [&_a]:text-primary [&_a]:underline whitespace-break-spaces max-h-[40px]',
          !isOver ? 'overflow-y-auto [&::-webkit-scrollbar]:w-0' : `overflow-y-hidden`,
          isRead && 'text-color-text-muted',
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
