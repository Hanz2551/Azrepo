import { setToast, toastSelector } from '@/stores/global/slice';
import { useSelector } from 'react-redux';
import { createToast } from 'react-simple-toasts';
import IconTriangleAlert from '@/assets/icons/icon_triangle_alert.svg';
import IconCircleCheck from '@/assets/icons/icon_circle_check.svg';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/stores';

export default function Toast() {
  const dispatch = useAppDispatch();

  const toast = useSelector(toastSelector);

  const toastError = useMemo(
    () =>
      createToast({
        theme: 'error',
        render: (message) => (
          <>
            <IconTriangleAlert />
            {message}
          </>
        ),
        onClose: () => dispatch(setToast(null)),
      }),
    [dispatch],
  );

  const toastSuccess = useMemo(
    () =>
      createToast({
        theme: 'success',
        render: (message) => (
          <>
            <IconCircleCheck />
            {message}
          </>
        ),
        onClose: () => dispatch(setToast(null)),
      }),
    [dispatch],
  );

  useEffect(() => {
    if (!toast) return;
    if (toast.status === 'error') toastError(toast.message);
    else toastSuccess(toast.message);
  }, [toast, toastError, toastSuccess]);

  return null;
}
