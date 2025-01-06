import Button from '@/components/atoms/Button';
import Modal from '@/components/molecules/Modal';
import { useMemo } from 'react';

type Props = {
  onClose: () => void;
  onOk: () => void;
  loading?: boolean;
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
};

export default function ModalConfirmDelete({
  onClose,
  onOk,
  loading,
  children,
  title,
  subTitle,
}: Props) {
  const footer = useMemo(
    () => (
      <>
        <Button
          variant="outlined"
          type="secondary"
          className="h-[40px] w-[calc(50%_-_4px)]"
          disabled={loading}
          onClick={onClose}
        >
          キャンセル
        </Button>
        <Button
          type="error"
          className="h-[40px] w-[calc(50%_-_4px)]"
          loading={loading}
          onClick={onOk}
        >
          削除
        </Button>
      </>
    ),
    [loading, onClose, onOk],
  );

  return (
    <Modal title={title} subTitle={subTitle} footer={footer} onClose={onClose}>
      {children}
    </Modal>
  );
}
