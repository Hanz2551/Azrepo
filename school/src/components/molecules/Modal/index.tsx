import IconX from '@/components/atoms/Icon/IconX';

type Props = {
  onClose: () => void;
  loading?: boolean;
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  footer?: React.ReactNode;
  widthClass?: string;
};

export default function Modal({
  onClose,
  loading,
  children,
  title,
  subTitle,
  footer,
  widthClass = 'w-[423px]',
}: Props) {
  return (
    <>
      <div className="bg-[#02121fa3] fixed inset-0 z-modal-backdrop" />
      <div className="scroller-y-base fixed top-0 right-0 left-0 z-modal flex justify-center items-center w-full h-full">
        <div className={`${widthClass} relative bg-white rounded-[8px] shadow m-4`}>
          <div className="py-6 pr-8 pl-6">
            {title && <h3 className="text-heading20B">{title}</h3>}
            {subTitle && <p className="mt-[4px] text-body14 text-color-text-muted">{subTitle}</p>}
            <button
              type="button"
              className="p-[4px] absolute top-2 right-2"
              onClick={() => !loading && onClose()}
            >
              <IconX />
            </button>
          </div>

          <div className="px-6 pb-6">{children}</div>

          {footer && <div className="px-6 pb-6 flex gap-2">{footer}</div>}
        </div>
      </div>
    </>
  );
}
