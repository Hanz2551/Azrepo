import { setToast, toastSelector } from '@/stores/global/slice';
import { useSelector } from 'react-redux';
import { createToast, clearToasts } from 'react-simple-toasts';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/stores';
import IconX from '@/components/atoms/Icon/IconX';
import IconTriangleAlert from '@/assets/icons/icon_triangle_alert.svg';
import IconCircleCheck from '@/assets/icons/icon_circle_check.svg';

export default function Toast() {
  const dispatch = useAppDispatch();

  const toast = useSelector(toastSelector);

  const toastError = useMemo(
    () =>
      createToast({
        theme: 'error',
        onClose: () => dispatch(setToast(null)),
        render: (message) => (
          <>
            <div className="flex items-center gap-2">
              <IconTriangleAlert />
              {message}{' '}
            </div>
            <button className="p-2" onClick={clearToasts}>
              <IconX className="text-color-icon" />
            </button>
          </>
        ),
      }),
    [], // eslint-disable-line
  );

  const toastSuccess = useMemo(
    () =>
      createToast({
        theme: 'success',
        onClose: () => dispatch(setToast(null)),
        render: (message) => (
          <>
            <div className="flex items-center gap-2">
              <IconCircleCheck />
              {message}{' '}
            </div>
            <button onClick={clearToasts}>
              <IconX className="text-color-icon" />
            </button>
          </>
        ),
      }),
    [], // eslint-disable-line
  );

  useEffect(() => {
    if (!toast) return;
    if (toast.status === 'error') toastError(toast.message);
    else toastSuccess(toast.message);
  }, [toast]); // eslint-disable-line

  return null;
}
