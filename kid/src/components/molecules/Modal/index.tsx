// import IconX from '@/components/atoms/Icon/IconX';

type Props = {
  // onClose: () => void;
  loading?: boolean;
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  footer?: React.ReactNode;
};

export default function Modal({
  // onClose,
  // loading,
  children,
  title,
  subTitle,
  footer,
}: Props) {
  return (
    <>
      <div className="scroller-base fixed top-0 left-0 w-full h-full flex justify-center items-center z-modal bg-white">
        <div className={`max-w-[1194px] relative`}>
          <div className="p-8">
            {title && <h3 className="text-heading30B text-center">{title}</h3>}
            {subTitle && <p className="mt-[4px] text-body14 text-color-text-muted">{subTitle}</p>}
            {/* <button
              type="button"
              className="p-[4px] absolute top-2 right-2"
              onClick={() => !loading && onClose()}
            >
              <IconX />
            </button> */}
          </div>

          <div className="p-8">{children}</div>

          {footer && <div className="px-6 pb-6 flex gap-2">{footer}</div>}
        </div>
      </div>
    </>
  );
}
