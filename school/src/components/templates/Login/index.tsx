import { useAppDispatch } from '@/stores';
import { login } from '@/stores/auth/slice';
import { ROUTES } from '@/utils/constants/routes';
import { EUserType, TFormInputsLogin } from '@/utils/types/auth';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { setToast } from '@/stores/global/slice';
import ImageSchool from '@/assets/images/img_ilust_schoolbus.jpg';

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
      .then((user) => {
        if (user.userType === EUserType.TEACHER) {
          router.push(ROUTES.BUS_SCHEDULE_BY_STUDENTS);
        } else if (user.userType === EUserType.DRIVER) {
          router.push(ROUTES.BUS_SCHEDULE_BY_BUS);
        }
      })
      .catch(() => {
        setLoading(false);
        dispatch(setToast({ status: 'error', message: 'ログインIDまたはパスワードが違います' }));
      });
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col lg:flex-row items-center justify-center max-lg:py-6 lg:p-6 2xl:p-16">
      <div className="w-full lg:w-[37.8125%]">
        <div className="px-6 lg:px-8 w-full max-w-[400px] max-lg:mx-auto lg:ml-auto">
          <Input
            label="ログインID"
            name="loginId"
            className="mb-6 2xl:mb-10"
            placeholder="ログインID"
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
            className="w-full h-[40px] mt-10 2xl:mt-12"
            disabled={btnSubmitDisabled}
            loading={loading}
            onClick={handleLogin}
          >
            ログイン
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-[62.1875%] mt-10 lg:mt-0">
        <h1 className="text-[28px] leading-[36px] lg:text-[32px] lg:leading-[44px] xl:text-[40px] xl:leading-[52px] 2xl:text-[58px] 2xl:leading-[75px] text-primary font-bold text-center tracking-[0.16px] max-lg:px-4">
          なみえ創成小中学校
          <br />
          保護者連絡・出席管理
          <br />
          スクールバス運用管理システム
        </h1>
        <img
          src={ImageSchool.src}
          alt="school bus"
          className="lg:max-h-[calc(100dvh_-_350px)] mx-auto"
        />
      </div>
    </div>
  );
}
