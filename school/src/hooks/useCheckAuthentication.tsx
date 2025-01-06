import { ROUTES } from '@/utils/constants/routes';
import {
  getAccessToken,
  getCurrentUser,
  getExpiresAt,
  getRefreshToken,
  checkValidCurrentUser,
} from '@/utils/helpers/auth';
import { isBefore, isValid } from 'date-fns';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import authAPI from '@/libs/api/auth';
import { useSelector } from 'react-redux';
import { currentUserSelector, initCurrentUser } from '@/stores/auth/slice';
import { useAppDispatch } from '@/stores';
import { EUserType } from '@/utils/types/auth';
import _isEqual from 'lodash/isEqual';

export default function useCheckAuthentication() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userInStore = useSelector(currentUserSelector);
  const [init, setInit] = useState(false);

  const checkAuthentication = useCallback(async () => {
    const accessToken = getAccessToken();
    const expiresAt = getExpiresAt();
    const refreshToken = getRefreshToken();
    const currentUserInStorage = getCurrentUser();
    const isValidCurrentUserInStorage = checkValidCurrentUser(currentUserInStorage);

    // empty auth info in localStorage
    if (!accessToken || !expiresAt || !refreshToken || !isValidCurrentUserInStorage) {
      return router.push(ROUTES.LOGIN);
    }

    if (!userInStore) {
      dispatch(initCurrentUser(currentUserInStorage));
    } else if (!_isEqual(userInStore, currentUserInStorage)) {
      return router.push(ROUTES.LOGIN);
    }

    const checkAccessibleToPage = () => {
      const userType = currentUserInStorage?.userType;
      if (userType === EUserType.TEACHER) {
        if (router.pathname === '/') {
          router.push(ROUTES.BUS_SCHEDULE_BY_STUDENTS);
          return false;
        }
        return true;
      }
      if (userType === EUserType.DRIVER) {
        if (router.pathname === ROUTES.BUS_SCHEDULE_BY_BUS) return true;
        router.push(ROUTES.BUS_SCHEDULE_BY_BUS);
        return false;
      }
      return false;
    };

    // access_token is still valid
    if (expiresAt && isValid(new Date(+expiresAt)) && isBefore(new Date(), new Date(+expiresAt))) {
      return setInit(checkAccessibleToPage());
    }

    // access_token is expired
    try {
      await authAPI.refreshAccessToken();
      return setInit(checkAccessibleToPage());
    } catch {
      router.push(ROUTES.LOGIN);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return { init };
}
