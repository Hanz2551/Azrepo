import { ROUTES } from '@/utils/constants/routes';
import {
  clearAuthStorage,
  getAccessToken,
  getExpiresAt,
  getRefreshToken,
} from '@/utils/helpers/auth';
import { isBefore, isValid } from 'date-fns';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import authAPI from '@/libs/api/auth';

export default function useCheckAuthentication() {
  const router = useRouter();

  const [init, setInit] = useState(false);

  const checkAuthentication = useCallback(async () => {
    const accessToken = getAccessToken();
    const expiresAt = getExpiresAt();
    const refreshToken = getRefreshToken();

    if (!accessToken || !expiresAt || !refreshToken) {
      router.push(ROUTES.LOGIN);
    } else if (
      expiresAt &&
      isValid(new Date(+expiresAt)) &&
      isBefore(new Date(), new Date(+expiresAt))
    ) {
      return setInit(true);
    } else {
      try {
        await authAPI.refreshAccessToken();
        return setInit(true);
      } catch {
        clearAuthStorage();
        router.push(ROUTES.LOGIN);
      }
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return { init };
}
