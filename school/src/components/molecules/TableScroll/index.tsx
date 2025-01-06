import { cn } from '@/utils/helpers/tailwind';
import { useEffect, useMemo, useRef, useState } from 'react';
import IconEmpty from '@/assets/icons/icon_glass_x.svg';
import { TTableColumns } from '@/utils/types/global';
import _get from 'lodash/get';

type Props<T> = {
  fetching?: boolean;
  /**
   * 100dvh - offset (padding, margin, element...) AND 2px
   * 2px is border of scroller wrapper
   * tailwind class exp: max-h-[calc(100dvh_-_162px)]
   */
  maxHeight: string;
  /**
   * default: maxHeight - (thead + border = 49px)
   */
  maxHeightEmpty: string;
  columns: TTableColumns<T>;
  data: T[] | null;
  isFilter?: boolean;
  keyName?: string;
  tdClassName?: string;
  emptyMessage?: React.ReactNode;
  customCellPadding?: (string | null)[];
  scrollerClass?: string;
  minWidth?: string;
  onRowClick?: (id?: number) => void;
};

export default function TableScroll<T>({
  fetching,
  data,
  maxHeight,
  maxHeightEmpty,
  columns,
  isFilter,
  keyName = 'id',
  tdClassName = '',
  emptyMessage,
  customCellPadding,
  scrollerClass = '',
  minWidth = '',
  onRowClick,
}: Props<T>) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    if (fetching) return;
    if (!scrollerRef.current) return;
    setHasScroll(scrollerRef.current.scrollHeight > scrollerRef.current.clientHeight);
  }, [fetching]);

  const colgroup = useMemo(
    () => (
      <colgroup>
        {columns.map((col) => (
          <col key={col.name} width={col.width} />
        ))}
      </colgroup>
    ),
    [columns],
  );

  return (
    <div className={cn('relative border rounded-[8px] bg-white', hasScroll && 'pr-[2px]')}>
      <div
        ref={scrollerRef}
        className={cn(
          `w-full ${maxHeight} scroller-y-base`,
          hasScroll && 'pr-[2px]',
          scrollerClass,
        )}
      >
        <div
          className={cn(
            'sticky top-0 bg-white border-b rounded-tl-[8px] rounded-tr-[8px]',
            hasScroll && 'rounded-tr-[0]',
            minWidth,
          )}
        >
          <table className="table-fixed border-separate border-spacing-0 w-full">
            {colgroup}
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={col.name}
                    className={cn(
                      'text-left text-body16 text-regent-gray-700 font-medium px-4 py-3',
                      customCellPadding && customCellPadding[index],
                    )}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        <table className={cn('table-fixed border-separate border-spacing-0 w-full', minWidth)}>
          {colgroup}
          <tbody>
            {!fetching && !data?.length && (
              <tr>
                <td colSpan={columns.length} className="p-0">
                  <div
                    className={`w-full h-[400px] ${maxHeightEmpty} flex flex-col gap-2 items-center justify-center`}
                  >
                    <IconEmpty />
                    {emptyMessage || (
                      <>
                        <p className="text-body16B">
                          {isFilter ? '検索結果が見つかりませんでした' : 'データがありません'}
                        </p>
                        {isFilter && (
                          <p className="text-one-line14 text-regent-gray-700">
                            条件を変更して再検索してください。
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            )}
            {data?.map((record, recordIndex) => (
              <tr
                key={_get(record, keyName)}
                className={onRowClick ? 'cursor-pointer' : ''}
                onClick={() => _get(record, 'id') && onRowClick?.(_get(record, 'id'))}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={col.name}
                    className={cn(
                      `px-4 py-2 ${recordIndex === 0 ? '' : 'border-t'}`,
                      tdClassName,
                      customCellPadding && customCellPadding[colIndex],
                    )}
                  >
                    {col.renderer(record)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
