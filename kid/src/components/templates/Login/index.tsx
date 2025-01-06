import Button from '@/components/atoms/Button';
import ImageSchool from '@/assets/images/img_ilust_schoolbus.png';
import ImageText from '@/assets/images/img_hukidashi_text.png';
import { useState } from 'react';
import Modal from '@/components/molecules/Modal';
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useAppDispatch } from '@/stores';
import { login } from '@/stores/auth/slice';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants/routes';

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [modalScanOpen, setModalScanOpen] = useState(false);

  const handleScan = (data: IDetectedBarcode[]) => {
    dispatch(login(data?.[0]?.rawValue || ''))
      .unwrap()
      .then(() => router.push(ROUTES.TOP));
  };

  return (
    <div className="bg-regent-gray-50">
      <div className="mx-auto max-w-[1194px] min-h-[100dvh] flex flex-col justify-between items-center py-20">
        <div>
          <h1 className="text-[58px] tracking-[0.16px] font-bold text-primary text-center">
            なみえ創成小中学校
          </h1>
          <img src={ImageSchool.src} alt="なみえ創成小中学校" />
          <img
            src={ImageText.src}
            alt="hukidashi"
            className="block mx-auto max-w-[60%] lg:max-w-none"
          />
        </div>

        <Button
          className="rounded-full h-[100px] lg:h-[156px] text-[40px] lg:text-[64px] mt-16 w-[900px] max-w-[80%]"
          onClick={() => setModalScanOpen(true)}
        >
          はじめる
        </Button>
      </div>

      {modalScanOpen && (
        <Modal title="QRコードを読み取ってね！">
          <div className="w-[480px] h-[480px] lg:w-[600px] lg:h-[600px] mx-auto">
            <Scanner onScan={handleScan} constraints={{ facingMode: 'user' }} />
          </div>
          <Button
            type="secondary"
            variant="outlined"
            className="mt-16 w-[480px] lg:w-[600px] mx-auto text-[36px] h-[64px] rounded-full"
            onClick={() => setModalScanOpen(false)}
          >
            やめる
          </Button>
        </Modal>
      )}
    </div>
  );
}
