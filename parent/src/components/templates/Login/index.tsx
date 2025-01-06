import { useAppDispatch } from '@/stores';
import { login } from '@/stores/auth/slice';
import { ROUTES } from '@/utils/constants/routes';
import { TFormInputsLogin } from '@/utils/types/auth';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { setToast } from '@/stores/global/slice';
import imgSchoolBus from '@/assets/images/img_ilust_schoolbus.jpg';

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formInputs, setFormInputs] = useState<TFormInputsLogin>({
    loginId: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const btnSubmitDisabled = useMemo(() => {
    return !formInputs.loginId.trim() || !formInputs.password.trim();
  }, [formInputs]);

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  const handleLogin = () => {
    setLoading(true);
    dispatch(login(formInputs))
      .unwrap()
      .then(() => {
        router.push(ROUTES.TOP);
      })
      .catch(() => {
        setLoading(false);
        dispatch(setToast({ status: 'error', message: 'ログインIDまたはパスワードが違います' }));
      });
  };

  return (
    <div className="flex flex-col justify-center min-h-[100dvh] p-6">
      <div className="w-full mb-[40px]">
        <h2 className="text-heading24B mb-8">ログイン</h2>

        <Input
          label="ログインID"
          name="loginId"
          placeholder="ログインID"
          className="mb-4"
          value={formInputs.loginId}
          onChange={handleChange}
        />
        <Input
          label="パスワード"
          name="password"
          type="password"
          placeholder="パスワード"
          value={formInputs.password}
          onChange={handleChange}
        />

        <Button
          className="w-full h-[48px] rounded-[100px] mt-8"
          disabled={btnSubmitDisabled}
          loading={loading}
          onClick={handleLogin}
        >
          ログイン
        </Button>
      </div>

      <img src={imgSchoolBus.src} alt="school bus" />

      <p className="text-primary text-[22px] leading-[29px] font-bold text-center tracking-[0.16px]">
        なみえ創成小中学校
        <br />
        登下校連絡アプリ
      </p>
    </div>
  );
}
